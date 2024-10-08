"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require('express');
const { ensureLoggedIn, ensureAdmin, ensureSameUserOrAdmin } = require("../middleware/auth.js");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
//const userNewSchema = require("../schemas/userNew.json");
//const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** POST / { user } => { user, token }
 * 
 * Adds new user. This is not a registration endpoint. This route is for admin's use only to add users. registration endpoint is disabled unless requested by client.
 * 
 * This returns the newly created user and an authentication token for them:
 * { user: { username, firstName, lastName, email, isAdmin }, token }
 * 
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

/** GET / => { users: [{ username, firstName, lastName, email, isAdmin } ... ]}
 * 
 * Returns list of all users.
 * 
 * Authorization required: admin
 */

router.get("/", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users });        
    } catch (err) {
        return next(err);
    }
});

/** GET /:username => { user }
 * 
 * Returns { username, firstName, LastName, isAdmin }
 * 
 * if user has associated facilities, will return list of associated facilities as well.
 * 
 * Authorization required: Admin
 */
// ensureLoggedIn, ensureSameUserOrAdmin,
router.get("/:username",  async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        
        // const facilities = await User.getFacilities(req.params.username);

        // /** if associated facilities, return user instance with array of facilities */
        // if (facilities.length > 0) {
        //     user.facilities = facilities;
        // }
        

        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[username] { user } => { user }
 * 
 * Data can include: 
 *  { firstName, lastName, password, email, facility }
 * 
 * returns { username, firstName, lastName, email, isAdmin }
 * 
 * Authorization required: admin
 */
router.patch("/:username", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[username] => { deleted: username }
 * 
 * Authorization required: admin
 */
router.delete("/:username", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;