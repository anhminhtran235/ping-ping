const mongoose = require('mongoose');

const AppUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  lastPing: {
    type: Date,
    default: Date.now,
  },
  updateEverySeconds: {
    type: Number,
    required: true,
  },
  ignoreFrom: {
    type: Number,
    default: 0,
  },
  ignoreTo: {
    type: Number,
    default: 0,
  },
});

module.exports = AppUrl = mongoose.model('apiUrl', AppUrlSchema);
