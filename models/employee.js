const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = require("./task.js");

const employeeSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  tasks: [taskSchema],
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
