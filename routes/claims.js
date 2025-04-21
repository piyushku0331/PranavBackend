const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');

router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find().populate('policy');
    res.render('claims/list', { claims });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/new', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.render('claims/new', { policies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  const { claimNumber, policy, claimAmount, claimStatus } = req.body;
  try {
    const newClaim = new Claim({ claimNumber, policy, claimAmount, claimStatus });
    await newClaim.save();
    res.redirect('/claims');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const policies = await Policy.find();
    const claim = await Claim.findById(req.params.id).populate('policy');
    if (!claim) {
      return res.status(404).send('Claim not found');
    }
    res.render('claims/edit', { claim, policies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/:id/edit', async (req, res) => {
  const { claimNumber, policy, claimAmount, claimStatus } = req.body;
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      { claimNumber, policy, claimAmount, claimStatus },
      { new: true } // Return the updated claim
    );
    if (!updatedClaim) {
      return res.status(404).send('Claim not found');
    }
    res.redirect('/claims');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/:id/delete', async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.id);
    if (!claim) {
      return res.status(404).send('Claim not found');
    }
    res.redirect('/claims');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
