"use strict";

/** Routes for documents. */

const jsonschema = require("jsonschema");

const express = require('express');
const { ensureLoggedIn, ensureAdmin, ensureSameUserOrAdmin } = require("../middleware/auth.js");
const { BadRequestError } = require("../expressError");
const Document = require("../models/document");
const { createToken } = require("../helpers/tokens");
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const router = express.Router();

/** GET All Documents */
router.get("/", async function (req, res, next) {
    try {
        const documents = await Document.findAll();
        return res.json({ documents });        
    } catch (err) {
        return next(err);
    }
});

router.get('/find-by-id/:id', async function (req, res, next ) {
    try {
        const document = await Document.find(req.params.id);
        return res.json({ document })
    } catch (err) {
        return next(err);
    }
});

/** Route to retrieve documents by author */
router.get('/find-by-user/:username', async function (req, res, next) {
    try {
        const documents = await Document.getDocsByAuthor(req.params.username);
        return res.json({ documents })
    } catch (err) {
        return next(err);
    }
});

/** Route to retrieve documents by facility */
router.get('/find-by-facility/:facilityId', async function (req, res, next) {
    try {
        const documents = await Document.getDocsByFacility(req.params.facilityId);
        return res.json({ documents })
    } catch (err) {
        return next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        // const validator = jsonschema.validate(req.body, documentNewSchema);
        // if (!validator.valid) {
        //     const errs = validator.errors.map(e => e.stack);
        //     throw new BadRequestError(errs);
        // }
        const document = await Document.create(req.body);
        return res.status(201).json({ document });
    } catch (err) {
        return next(err);
    }
});

/** Route to retrieve the dates to populate the quick view tickler. */
router.get('/tickler-preview/:facilityId', async function (req, res, next) {
    try {
        const documents = await Document.getDocDueDatesByFacility(req.params.facilityId);
        return res.json({ documents })
    } catch (err) {
        return next(err);
    }
})

router.get('/aws/:fileName', async function (req, res, next) {
    const client = new S3Client()
    try {
        return res.json("reached proper endpoint.");
    } catch (e) {
        return next(e);
    }
})



module.exports = router;