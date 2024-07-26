"use strict";

/** Routes for documents. */

const jsonschema = require("jsonschema");

const express = require('express');
const { ensureLoggedIn, ensureAdmin, ensureSameUserOrAdmin } = require("../middleware/auth.js");
const { BadRequestError } = require("../expressError");
const Document = require("../models/document");
const { createToken } = require("../helpers/tokens");

const router = express.Router();

/** GET All Documents */
router.get("/", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
    try {
        const documents = await Document.findAll();
        return res.json({ documents });        
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', ensureLoggedIn, ensureAdmin, async function (req, res, next ) {
    try {
        const document = await Document.find(req.params.id);
        return res.json({ document })
    } catch (err) {
        return next(err);
    }
});

module.exports = router;