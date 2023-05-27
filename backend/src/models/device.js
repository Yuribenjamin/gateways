const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4(),
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
