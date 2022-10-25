//import packages
const { error } = require('console');
const express = require('express');
const path = require('path');

//intialize instances
const app = express();
require('dotenv').config();

//import routees
const todoRouter = require('./routes/todoRoute.js');

app.use('/api/todos', todoRouter);

//serving up index html on root path
app.use('/', express.static(path.resolve(__dirname, '../client')));

//handler for nonexistant routes
app.use((req, res) => {
    res.status(404).send('Sorry, page not found.')
});

app.use((err, req, res, next) => {
    //default error object
    const defaultError = {
        log: 'Error found in unknown middleware',
        status: 500,
        message: {
            err: 'An error occurred'
        }
    };

    //replace default messages with messages on error sent from middleware
    const errorObj = Object.assign(defaultError, err);
    return res.status(errorObj.status).json(errorObj.message);
});

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT)
})