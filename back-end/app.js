"use strict";

/** Express app for capstone 2: FacilAssist */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { NotFoundError } = require("./expressError");

/** Declare routes here. Each route path will use it's own 'router' in separate file. */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
// const facilitiesRoutes = require('./routes/facilities');
// const docRoutes = require('./routes/documents');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// app.use('/facilities', facilitiesRoutes);
// app.use('/documents', docRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    //return next(new NotFoundError());
    return "Hi"
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});


module.exports = app;