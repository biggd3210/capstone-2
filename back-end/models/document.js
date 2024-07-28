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
     * Returns { id, author, docType, imageComponents, facilityId, docPeriod, docYear, fileName, dateTime }
     * 
     * authorization: signed in, User must be authorized for facility. 
    */

    static async create({ id, author, docType, attachments, facility, period, year, fileName, dateTime }) {
        const duplicateCheck = await db.query(
            `SELECT id
            FROM documents
            WHERE id = $1`,
            [id]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate document: ${id}`);
        }

        const result = await db.query(
            `INSERT INTO documents
            (id, author, doc_type, image_components, facility_id, doc_period, doc_year, file_name, date_time)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, author, doc_type AS "docType", image_components AS "imageComponents", facility_id AS "facilityId", doc_period AS "docPeriod", doc_year AS "docYear", file_name AS "fileName", date_time AS "dateTime"`,
            [ id, author, docType, attachments, facility, period, year, fileName, dateTime ],
        );

        const document = result.rows[0];

        return document;
    }

    /** Find all documents. Will pull full list of documents from database. 
     * 
     * Will eventually only pull data from specific user and/or facility (unless user is admin.)
     * 
     * Authorization: loggedIn or Admin
     */
    static async getAllDocs() {
        const result = await db.query(
            `SELECT id,
                author,
                doc_type AS "docType", 
                image_components AS "imageComponents", 
                facility_id AS "facilityId", 
                doc_period AS "docPeriod", 
                doc_year AS "docYear", 
                file_name AS "fileName", 
                date_time AS "dateTime"
            FROM documents`
        );

        return result.rows
    }

    /** Find document based on filter criteria. 
     * Currently, filter criteria will be set only to fileName in order to pull image from cloudflare.
     */
    static async getDoc({ fileName }) {
        const result = await db.query(
            `SELECT id, 
                author, 
                doc_type AS "docType", 
                image_components AS "imageComponents", 
                facility_id AS "facilityId", 
                doc_period AS "docPeriod", 
                doc_year AS "docYear", 
                file_name AS "fileName", 
                date_time AS "dateTime"
            FROM documents`
        )
    }

    /** create  */

    /** Connects to Cloudflare to ensure PUT object to Facility Assist Bucket.*/

    // static async putObjectToBucket(data) {

    // }
}

module.exports = Document;