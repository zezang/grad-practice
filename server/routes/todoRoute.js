const express = require('express');
const router = express.Router()
const todoController = require('../controllers/todoController.js');

router.route('/')
    .get(todoController.getTodos, (req, rex) => {
        res.status(200).json(res.locals.todos)
    })

module.exports = router;
