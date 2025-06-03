const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const Admin = require("../models/admin");

// SINGLE EMPLOYEE DATA
router.get("/employees/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const loggedInEmployee = await Employee.findOne({ email: email });
    const loggedInAdmin = await Admin.findOne({ email: email });
    console.log(loggedInEmployee, loggedInAdmin);

    if (loggedInEmployee) {
      res.json({ message: "Sucessful", employee: loggedInEmployee });
    } else if (loggedInAdmin) {
      res.json({ message: "Sucessful", admin: loggedInAdmin });
    } else {
      res.status(401).json({ message: "Invalid Email User" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ALL EMPLOYEES DATA
router.get("/employees", async (req, res) => {
  try {
    const allEmployees = await Employee.find({});

    if (allEmployees) {
      res.json({ message: "Succesfull", allEmployees });
    } else {
      res.status(401).json({ message: "No Users Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE
router.patch("/edit", async (req, res) => {
  const { taskId, employeeId, action } = req.body;
  try {
    if (action === "accepted") {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: employeeId, "tasks._id": taskId },
        { $set: { "tasks.$.accepted": true, "tasks.$.newtask": false } },
        { new: true }
      );

      if (updatedEmployee) {
        return res.status(200).json({
          message: "Task update successfully",
          employee: updatedEmployee,
        });
      } else {
        return res.status(404).json({ message: "Task Not Found" });
      }
    }

    if (action === "completed") {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: employeeId, "tasks._id": taskId },
        { $set: { "tasks.$.completed": true, "tasks.$.failed": false } },
        { new: true }
      );

      if (updatedEmployee) {
        return res.status(200).json({
          message: "Task update successfully",
          employee: updatedEmployee,
        });
      } else {
        return res.status(404).json({ message: "Task Not Found" });
      }
    }

    if (action === "failed") {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: employeeId, "tasks._id": taskId },
        { $set: { "tasks.$.failed": true, "tasks.$.completed": false } },
        { new: true }
      );

      if (updatedEmployee) {
        return res.status(200).json({
          message: "Task update succesfully",
          employee: updatedEmployee,
        });
      } else {
        return res.status(404).json({ message: "Task Not Found" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE EMPLOYEES-TASK (UPDATE)
router.patch("/employees/editasks", async (req, res) => {
  const { taskTitle, taskDescription, category, date, selectedEmployee } =
    req.body;
  const newTask = {
    accepted: false,
    newtask: true,
    completed: false,
    failed: false,
    taskTitle,
    taskDescription,
    category,
    date,
  };

  try {
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: selectedEmployee },
      { $push: { tasks: newTask } }
    );

    if (updateEmployee) {
      return res
        .status(200)
        .json({ message: "Task Added Successfully", employee: updateEmployee });
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE EMPLOYEE-DETAILS
router.patch("/employees/editemployee", async (req, res) => {
  const { isUserAdmin } = req.body;
  const { name, email, phone, address, _id, profileImage } = isUserAdmin;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: _id },
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        profileImage: profileImage,
      },
      { new: true }
    );

    if (updatedEmployee) {
      return res.status(200).json({
        messgae: "Employee update successfully",
        employee: updatedEmployee,
      });
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE EMPLOYEES
router.post("/employees/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const employee = new Employee({
      name: name,
      email: email,
      password: password,
      type: "Employee",
      tasks: [],
    });
    await employee.save();
    res.status(201).json({ message: "Employee create successfully", employee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Network Error" });
  }
});

// DELETE EMPLOYEES (DELETE)
router.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (deletedEmployee) {
      return res.status(200).json({ message: "Employee deleted Successfully" });
    } else {
      return res.status(404).json({ message: "Employee Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
