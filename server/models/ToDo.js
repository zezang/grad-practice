const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    author: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: new Date() }
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;