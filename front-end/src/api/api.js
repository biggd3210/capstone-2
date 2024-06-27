import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * 
 * Static class tying together methods used to get/send to the API. 
 * 
 * No front end specific stuff in this file. And no API aware items outside of this file.
 */

class FacilityAssistApi {
    // the token for interactive with the api will be stored here.
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

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get facilities (filtered by name if not undefined) */

    static async getFacilities(name) {
        let res = await this.request("facilities", { name });
        return res.facilities;
    }



    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }
}

export default FacilityAssistApi;