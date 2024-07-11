const db = require("../db");
const bcrypt = require("bcrypt");

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ExpressError,
} = require("../expressError");

class Document {
    /** Creates a Document from data 
     * 
     * Returns { username, facility_id, title, date_time, doc_type, bucketPath }
     * 
     * authorization: signed in, User must be authorized for facility. 
    */

    // static async create ({ username, facility_id, title, period, date_time, doc_type, bucketPath }) {
    //     /** Should check for duplicates  */
    // }

    /** Connects to Cloudflare to ensure PUT object to Facility Assist Bucket.*/

    // static async putObjectToBucket(data) {

    // }
}