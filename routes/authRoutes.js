const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const Admin = require("../models/admin");

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(userEmail, userPassword);
  try {
    const loggedInEmployee = await Employee.findOne({
      email: userEmail,
      password: userPassword,
    });
    const loggedInAdmin = await Admin.findOne({
      email: userEmail,
      password: userPassword,
    });

    if (loggedInEmployee)
      return res.json({ message: "Successful", employee: loggedInEmployee });
    if (loggedInAdmin)
      return res.json({ message: "Successful", admin: loggedInAdmin });

    res.status(401).json({ message: "Invalid Email or Password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
