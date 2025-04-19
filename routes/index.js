const express = require('express');
const router = express.Router();

// GET: Render the home page
router.get('/', (req, res) => {
  try {
    res.render('index', { title: 'Insurance Management System' }); // Optional title for the page
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
