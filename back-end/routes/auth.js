"use strict";

/** Routes for authentication */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
//const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token: { username, password } => { token }
 * 
 * Returns JWT token which can be used to authenticate further requests.
 * 
 * Authorization required for route: none
 */

router.post("/token", async function (req, res, next) {
    console.log('req.body is ', req.body);
    try {
        
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token })
    } catch (err) {
        return next(err);
    }
});

/** POST /auth/register: { user } => { token }
 * 
 * This route is not currently utilized. This route is for a signup feature where an end user can register for an account. For the original client, this route is not necessary, currently. However, client may wish to add this feature. 
 * 
 * (Currently, users can only be added by an admin account which is under /routes/users.js => POST /users/)
 * 
 * user must include { username, password, firstName, lastName, email }
 * 
 * Returns JWT token which can be used to authenticate further request.
 * 
 * Authorization required: none
 * 
 */

/*
router.post('/register', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({ ... req.body, isAdmin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

*/



module.exports = router;