const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
 name:{
    type: String,
    required: [true, "Please insert the name!"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 character"]
 },
 completed: {
    type: Boolean,
    default: false,
 }

}, {timestamps: true});


// initializing the modal

const TaskModal = mongoose.model("TaskManager", taskSchema);
module.exports = TaskModal;