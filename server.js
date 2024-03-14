const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const auth = require("./routes/authRouter")
const session = require("express-session");

require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://bwb45:admin@main.93kl662.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
app.use(express.static('public'));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000000 } // Levensduur van de cookie in milliseconden
}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', employeeRoutes);
app.use("/", auth)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
