const express = require('express');
const router = express.Router();
require("dotenv").config();

const users = [
 
  {
    id: process.env.JULIAN_ID,
    user: process.env.JULIAN_USERNAME,
    password: process.env.JULIAN_PASSWORD,
  },
];

// Route voor de loginpagina
router.get('/login', (req, res) => {
  // Als de gebruiker al is ingelogd, stuur deze dan door naar het dashboard
  if (req.session.userId) {
    res.redirect("/add");
  } else {
    res.render("login");
  }
});

// Route voor de loginverwerking
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.user === username && u.password === password);
  if (user) {
    req.session.userId = user.id;
    req.session.userName = user.name; // Sla de gebruikers-ID op in de sessie
    res.redirect("/add");
  } else {
    res.send('Ongeldige gebruikersnaam of wachtwoord');
  }
});

module.exports = router;
