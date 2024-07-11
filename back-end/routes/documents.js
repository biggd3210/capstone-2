"use strict";

/** Routes for documents. */

const jsonschema = require("jsonschema");

const express = require('express');
const { ensureLoggedIn, ensureAdmin, ensureSameUserOrAdmin } = require("../middleware/auth.js");
const { BadRequestError } = require("../expressError");
const Document = require("../models/document");
const { createToken } = require("../helpers/tokens");

const router = express.Router();

router.get("/", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
    try {
        const documents = await Document.findAll();
        return res.json({ users });        
    } catch (err) {
        return next(err);
    }
});