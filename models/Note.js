const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Note', noteSchema);