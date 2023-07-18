const mongoose = require("mongoose");

//Cretaing a mongoose schema

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Task", taskSchema);