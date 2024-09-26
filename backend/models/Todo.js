// todoList.js
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
    },
});

// Use export default for ES module syntax
export default mongoose.model("Todo", todoSchema);
