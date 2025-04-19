const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true,
  },
  policyHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  policyType: {
    type: String,
    required: true,
  },
  coverageAmount: {
    type: Number,
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Policy = mongoose.model('Policy', PolicySchema);
module.exports = Policy;
