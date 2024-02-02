const mongoose = require('mongoose');

class TaskModel {
    constructor(title, description, dueDate, category) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.category = category;
        this.completed = false;
    }

    static getSchema() {
        return new mongoose.Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            dueDate: { type: Date, required: true },
            completed: { type: Boolean, default: false },
            category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        });
    }

    
}

const Task = mongoose.model('Task', TaskModel.getSchema());

module.exports = Task;
