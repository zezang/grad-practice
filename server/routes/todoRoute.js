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

router.route('/:id')
    .patch(todoController.editTodo, (req, res) => {
        res.status(200).json(res.locals.updatedTodo);
    })
    .delete(todoController.deleteTodo, (req, res) => {
        res.status(200).json('Deleted successfully')
    })

module.exports = router;
