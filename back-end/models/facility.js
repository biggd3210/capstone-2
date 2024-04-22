const db = require("../db");
const bcrypt = require("bcrypt");

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ExpressError,
} = require("../expressError");

/** Related functions for Facility */

class Factility {
    /** Create a company (from data), update db, return new company data
     * 
     * data should be { id, name, address, primary_owner, phone }
     * 
     * returns { id, name, address, primary_owner, phone }
     * 
     * Throws BadRequestError if facility is already in database
     */

    static async create({ id, name, address, primaryOwner, phoneNumber }) {
        const duplicateCheck = await db.query(
            `SELECT id
            FROM facilities
            WHERE id = $1`,
            [id]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate facility: ${id}`);
        }

        const result = await db.query(
            `INSERT INTO facilities
            (id, name, address, primary_owner, phone_number)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, address, primary_owners AS "primaryOwner", phone`,
            [ id, name, address, primaryOwner, phone],
        );

        const facility = result.rows[0];

        return facility;
    }

    /** Find all facilities
     * 
     * return [{ id, name, address, primary_owner, phone } ...]
     * 
     */

    static async findAll() {
        const facilitiesRes = await db.query(
            `SELECT id,
                    name,
                    address, 
                    primary_owner AS "primaryOwners",
                    phone
            FROM facility
            ORDER BY name`);
            return facilitiesRes.rows;
    }


}