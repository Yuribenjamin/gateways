const mongoose = require('mongoose');
const { ulid } = require('ulid');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  ulid: {
    type: String,
    default: ulid,
    unique: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    required: true,
  },
});

module.exports = mongoose.model('Device', deviceSchema);
