const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const User = require('../models/User');

// GET: List all policies
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find().populate('policyHolder');
    res.render('policies/list', { policies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET: Show form to create a new policy
router.get('/new', async (req, res) => {
  try {
    const users = await User.find();
    res.render('policies/new', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST: Create a new policy
router.post('/', async (req, res) => {
  const { policyNumber, policyHolder, policyType, coverageAmount, premium, startDate, endDate } = req.body;
  try {
    const newPolicy = new Policy({ policyNumber, policyHolder, policyType, coverageAmount, premium, startDate, endDate });
    await newPolicy.save();
    res.redirect('/policies');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET: Edit a policy
router.get('/:id/edit', async (req, res) => {
  try {
    const users = await User.find();
    const policy = await Policy.findById(req.params.id).populate('policyHolder');
    if (!policy) {
      return res.status(404).send('Policy not found');
    }
    res.render('policies/edit', { policy, users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST: Update a policy (used instead of PUT since no method-override)
router.post('/:id/edit', async (req, res) => {
  const { policyNumber, policyHolder, policyType, coverageAmount, premium, startDate, endDate } = req.body;
  try {
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      { policyNumber, policyHolder, policyType, coverageAmount, premium, startDate, endDate },
      { new: true } // Return the updated policy
    );
    if (!updatedPolicy) {
      return res.status(404).send('Policy not found');
    }
    res.redirect('/policies');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE: Delete a policy
router.get('/:id/delete', async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) {
      return res.status(404).send('Policy not found');
    }
    res.redirect('/policies');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
