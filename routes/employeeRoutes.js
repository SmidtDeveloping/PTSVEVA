const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Route voor het weergeven van alle werknemers
// router.get('/', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.render('index', { employees });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// Route voor het toevoegen van een werknemer
router.post('/add', async (req, res) => {
  const { name, position, department, roblox, rang } = req.body;
  try {
    const newEmployee = new Employee({ name, position, roblox, rang, department });
    await newEmployee.save();
    console.log(req.body, newEmployee)
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const employeesByDepartment = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          employees: { $push: '$$ROOT' }
        }
      }
    ]);
    res.render('groupedEmployees', { employeesByDepartment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
router.get("/add", (req, res) => {
  if (req.session.userId) {
    res.render("addEmployee")
  } else {
    // res.send('Je moet eerst inloggen om toegang te krijgen tot het dashboard');
    res.redirect("/login")
  }
})

module.exports = router;
