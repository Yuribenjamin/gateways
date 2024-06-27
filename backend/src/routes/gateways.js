const express = require('express');
const Gateway = require('../models/gateway');
const Device = require('../models/device');

const router = express.Router();

const ERRORS = {
  GATEWAY_NOT_FOUND: 'Gateway not found',
  MAX_DEVICES_REACHED: 'No more than 10 devices are allowed for a gateway'
};

const STATUS_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  OK: 200
};

const findGatewayById = async (id) => {
  const gateway = await Gateway.findById(id).populate('devices');
  if (!gateway) throw new Error(ERRORS.GATEWAY_NOT_FOUND);
  return gateway;
};

router.get('/', async (req, res) => {
  try {
    const gateways = await Gateway.find().populate('devices');
    res.json(gateways);
  } catch (err) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const gateway = await findGatewayById(id);
    res.json(gateway);
  } catch (err) {
    if (err.message === ERRORS.GATEWAY_NOT_FOUND) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: err.message });
    }
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { serial, name, ip, devices } = req.body;

    if (devices && devices.length > 10) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ERRORS.MAX_DEVICES_REACHED });
    }

    const gateway = new Gateway({ serial, name, ip });
    await gateway.save();

    res.status(STATUS_CODES.CREATED).json(gateway);
  } catch (err) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const gateway = await Gateway.findByIdAndDelete(id);
    if (gateway) {
      await Device.deleteMany({ gateway: id });
      res.status(STATUS_CODES.OK).json({ message: 'Gateway deleted successfully' });
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: ERRORS.GATEWAY_NOT_FOUND });
    }
  } catch (err) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

module.exports = router;
