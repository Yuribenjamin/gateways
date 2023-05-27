const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const gatewaySchema = new Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isIP(value, 4);
      },
      message: 'Invalid IPv4 address',
    },
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Device',
    },
  ],
});

module.exports = mongoose.model('Gateway', gatewaySchema);
