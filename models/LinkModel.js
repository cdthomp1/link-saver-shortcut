const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Link = mongoose.model('link', linkSchema);

module.exports = Link;