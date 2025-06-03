const mongoose = require("mongoose");
// DATA
const adminData = require("./adminData");
const employeesData = require("./employeeData");
// MODELS
const Employee = require("../models/employee.js");
const Admin = require("../models/admin.js");

// CONNECTION
const MONGO_URL = "mongodb://127.0.0.1:27017/taskmanagement";

main()
  .then(() => {
    console.log("DB is Connect");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// INITIAL DATA SETUP
const initDB = async () => {
  await Employee.deleteMany({});
  await Admin.deleteMany({});
  await Employee.insertMany(employeesData.data);
  await Admin.insertMany(adminData.data);
  console.log("Succesful");
};

initDB();
