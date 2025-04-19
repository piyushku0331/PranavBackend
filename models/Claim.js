const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
  claimNumber: {
    type: String,
    required: true,
    unique: true,
  },
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true,
  },
  claimAmount: {
    type: Number,
    required: true,
  },
  claimStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  claimDate: {
    type: Date,
    default: Date.now,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Claim = mongoose.model('Claim', ClaimSchema);
module.exports = Claim;