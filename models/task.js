const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  accepted: {
    type: Boolean,
    default: false,
  },
  newtask: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  failed: {
    type: Boolean,
    default: false,
  },
  taskTitle: {
    type: String,
  },
  taskDescription: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = taskSchema;
