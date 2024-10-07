"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ExpressError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
    /** authenticate user with username, password.
     *  
     *  Returns { username, first_name, last_name, email, is_admin }
     *  
     *  Throws UnauthorizedError if user not found or wrong password.
     */

    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data
     * 
     * Returns { username, firstName, lastName, email, isAdmin }
     * 
     * throws BadRequestError on duplicates.
     */

    static async register({ username, password, firstName, lastName, email, isAdmin }) {
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username],
        )

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate user found: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
                (username,
                password,
                first_name,
                last_name,
                email,
                is_admin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
            [ username, hashedPassword, firstName, lastName, email, isAdmin ],
        );

        const user = result.rows[0];

        return user;

    }

    /** Given username, return data about user.
     * 
     * Returns { username, first_name, last_name, is_admin, facilities }
     * 
     * Throws NotFoundError if user not found.
     */
    static async get(username) {
        const userRes = await db.query(
            `SELECT u.username,
                    u.first_name AS "firstName",
                    u.last_name AS "lastName",
                    u.email,
                    u.is_Admin AS "isAdmin"
            FROM users AS "u"
            WHERE username = $1`,
            [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        /** Query facilities by user and push any facilities to user instance */
        const facilityRes = await db.query(
            `SELECT f.id, f.facility_name
            FROM users AS "u" JOIN user_facilities AS "uf" ON (u.username = uf.user_id)
            JOIN facilities AS "f" ON (uf.facility_id = f.id)
            WHERE username = $1`,
            [username],
        );

        const facilities = facilityRes.rows;
        user.facilities = facilities;
        

        return user;
    }
}

module.exports = User;