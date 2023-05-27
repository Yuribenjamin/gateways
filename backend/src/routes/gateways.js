const express = require('express');
const Gateway = require('../models/gateway');
const Device = require('../models/device');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const gateways = await Gateway.find().populate('devices');
    res.json(gateways);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const gateway = await Gateway.findById(id).populate('devices');
    if (gateway) {
      res.json(gateway);
    } else {
      res.status(404).json({ error: 'Gateway not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { serial, name, ip, devices } = req.body;
    if (devices && devices.length > 10) {
      return res.status(400).json({ error: 'No more than 10 devices are allowed for a gateway' });
    }
    const gateway = new Gateway({ serial, name, ip });
    await gateway.save();

    res.status(201).json(gateway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Gateway.findByIdAndDelete(id);
    if (result) {
      await Device.deleteMany({ gateway: id });
      res.json({ message: 'Gateway deleted successfully' });
    } else {
      res.status(404).json({ error: 'Gateway not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
