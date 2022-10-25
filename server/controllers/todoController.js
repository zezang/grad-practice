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

exports.editTodo = async (req, res, next) => {
    const id = req.params.id;
    const { author, description } = req.body;

    if (!author || !description) return next({
        log: 'Error editing a new to do',
        status: 400,
        message: {
            err: 'Please provide an author and description',
        },
    });
    
    try {
        const updatedTodo = await ToDo.findByIdAndUpdate(id, { author, description }, { new: true });
        res.locals.updatedTodo = updatedTodo;
        return next();
    } catch(err) {
        return next({
            log: 'Error in editTodos middleware',
            status: 404,
            message: {
                err: err.message
            },
        });
    };
};

exports.deleteTodo = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deleteTodo = await ToDo.findByIdAndDelete(id);
    } catch(err) {
        return next({
            log: 'Error in deleteTodo middleware',
            status: 404,
            message: {
                err: err.message
            },
        })
    }
    
};