const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  roblox: String,
  rang: String,
  department: {
    type: String,
    enum: ['Commdando Groep', 'VERKENNING Staf', 'INFANTRIE Staf', 'VERKENNING', 'INFRANTRIE'] // Voeg hier alle afdelingen toe
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
