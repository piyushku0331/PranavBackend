const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.render('index', { title: 'Insurance Management System' }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
