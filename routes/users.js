const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/list', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/new', (req, res) => {
  res.render('users/new');
});


router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newUser = new User({ name, email, phone, address });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/:id/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('users/edit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.post('/:id/edit', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id/delete', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
