const mongoose = require('mongoose');

const categoryModel = mongoose.Schema({
    category: {
        type: String,
        required: true,
    }
})

const Category = mongoose.model('category', categoryModel);

module.exports = Category;