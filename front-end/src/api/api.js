import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { 
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand
 } from '@aws-sdk/client-s3';
 import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

 // https://facility-assist-backend.onrender.com
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** S3 values specific to Cloudflare */
const accountid = 'fc487f406f29f4759ae71c9fe9419652';
const tokenValue = '2kZ6HpFamhfbFDuZ0Uqcp2Y6NojFlvaPSqeU5q4A';
const access_key_id = 'aa87146d0f2f97304c6ed69651fbed79';
const access_key_secret = '7f2d68c9f2ac1f21dc5c4dec50d814730314e5c569ecec2e5acf80f1fcce229d';
const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: `${access_key_id}`,
        secretAccessKey: `${access_key_secret}`,
    },
});




/** API Class.
 * 
 * Static class tying together methods used to get/send to the API. 
 * 
 * No front end specific stuff in this file. And no API aware items outside of this file.
 */

class FacilityAssistApi {
    /** -------  All USER BASED METHODS --------- */
    
    /*
     * the token for interactive with the api will be stored here.
     * 
     * */
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${FacilityAssistApi.token}` };
        const params = ( method === "get" )
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get facilities (filtered by name if not undefined) */

    static async getFacilities(name) {
        let res = await this.request("users/facilities", { name });
        return res.facilities;
    }

    /** Get documents authored by user */

    static async findDocsByAuthor(username) {
        let res = await this.request(`documents/find-by-user/${username}`);
        return res.documents;
    }

    static async findDocsByFacility(facilityId) {
        let res = await this.request(`documents/find-by-facility/${facilityId}`);
        return res.documents;
    }
    /** Get all documents */

    static async getAllDocs() {
        let res = await this.request(`documents`);
    
        return res.documents;
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Get report data for tickler
     * Function pulls most recent report date for each document type. Used to calculate days until due to send reminders to facilities.
     * Queries db based on facility name.
     */

    static async fetchReportDates(facilityId) {
        let res = await this.request(`documents/tickler-preview/${facilityId}`);
        return res.documents;
    }

    /** getSignedURL that can be used for GET, PUT, DELETE actions */

    // static async getSignedUrl(key, operation) {
    //     var options = {
    //         Bucket: "facility-assist",
    //         Key: key, /* Filename in bucket */
    //         Expires: 60 * 10 /* URL should work for 10 minutes to compensate for large objects. */
    //     }
    // }

    /** Backend getobject from bucket */

    static async getObjectFromBackend(filename) {
        let res = await this.request(`aws/${filename}`)
        return res;
    }

    /** Get listobjects using signedUrl  */

    static async ListObjectsInBucket(data) {
        const url = await getSignedUrl(
            S3,
            new ListObjectsV2Command({
                Bucket: 'facility-assist',
                EncodingType: "url",

            }),
            { expiresIn: 60 * 10, } // 10 minutes
        );

        const response = await fetch(url);
        const reader = response.body.getReader();
        console.log("response is ", await reader.read());
        return response;
    }
    /** Get signedUrl for object to download from bucket */

    static async GetObjectFromBucket(data) {
        const key = data['key'];
        const url = await getSignedUrl(
            S3,
            new GetObjectCommand({
                Bucket: 'facility-assist',
                Key: key
            }),
            {
                expiresIn: 60 * 10, // 10minutes
            }
        );

        console.log('url is ', url);
        console.log("running or finished running");

        const response = await fetch(url)
        .then((resp) => resp.body)
        .then((body) => {
            const reader = body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        })
                    }
                }
            })
        })
        // Create a new response out of the stream
        .then((stream) => new Response(stream))
        // Create an object URL for the response
        .then((response) => response.blob())
        // .then((blob) => URL.createObjectURL(blob))
        .catch((err) => console.error(err))
        console.log('response is: ', response);
        return response;
    }

    /** put object to bucket. Used by new document form.  */

    static async putToBucket(data) {
        const { file, form } = data;
        const key = file.name;
        console.log('formdata is ,', form);
        const url = await getSignedUrl(
            S3,
            new PutObjectCommand({
                Bucket: 'facility-assist',
                Key: key
            }),
            {
                expiresIn: 60 * 10, // 10 minutes
            }
        );
        console.log("url is ", url);
        const options = {
            params: { Key: file.name, ContentType: file.type },
            headers: { 'Content-Type': file.type }
        };

        
        const fileRes = axios.put(url, file)
            .then(res => {
                console.log("res from axios put is ,", res);
                if (res.status === 200) {
                    form.id = uuidv4();
                    form.dateTime = new Date();
                    console.log('form data to send is ,', form);
                    const dbRes = this.request('documents/', form, 'post');
                    return dbRes.document;
                }
            })
            .catch(err => console.log(err));

        console.log('fileRes is ,', fileRes);

    }
}

export default FacilityAssistApi;