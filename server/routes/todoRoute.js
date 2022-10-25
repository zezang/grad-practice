const express = require('express');
const router = express.Router()
const todoController = require('../controllers/todoController.js');

router.route('/')
    .get(todoController.getTodos, (req, res) => {
        res.status(200).json(res.locals.todos);
    })
    .post(todoController.createTodo, (req, res) => {
        res.status(200).json(res.locals.todo);
    })

module.exports = router;
