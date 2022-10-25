const ToDo = require('../models/ToDo.js');

exports.getTodos = async (req, res, next) => {
    try {

        const todos = await ToDo.find({});
        res.locals.todos = todos;
        return next();

    } catch(err) {
        return next({
            log: 'Error in getTodos middleware',
            status: 404,
            message: {
                err: err.message
            },
        })
    };
};

exports.createTodo = async (req, res, next) => {
    const { author, description, dateCreated } = req.body;
    if (!author || !description) return next({
        log: 'Error creating a new to do',
        status: 400,
        message: {
            err: 'Please provide an author and description',
        },
    })

    try {
        const todo = await ToDo.create( { author, description, dateCreated } );
        res.locals.todo = todo;
        return next();
    } catch (err) {
        return next({
            log: 'Error in createTodo middleware',
            status: 400,
            message: {
                err: err.message,
            },
        })
    }
};