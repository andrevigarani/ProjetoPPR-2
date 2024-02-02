const mongoose = require('mongoose');

class Category {
    constructor(name) {
        this.name = name;
    }

    static getSchema() {
        return new mongoose.Schema({
            name: { type: String, required: true, unique: true }
        });
    }
}

const CategoryModel = mongoose.model('Category', Category.getSchema());

module.exports = CategoryModel;
