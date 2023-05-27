const express = require('express');
const Gateway = require('../models/gateway');
const Device = require('../models/device');

const router = express.Router();

router.post('/:id/devices', async (req, res) => {
  try {
    const id = req.params.id;
    const { vendor, status } = req.body;
    const gateway = await Gateway.findById(id);
    if (gateway) {
      if (gateway.devices.length >= 10) {
        return res.status(400).json({ error: 'No more than 10 devices are allowed for a gateway' });
      } else {
        const device = new Device({ vendor, status, gateway: id });
        await device.save();
        gateway.devices.push(device._id);
        await gateway.save();
        await gateway.populate('devices');
        res.status(201).json(gateway);
      }
    } else {
      res.status(404).json({ error: 'gateway not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id/devices/:deviceId', async (req, res) => {
  try {
    const { id, deviceId } = req.params;
    const gateway = await Gateway.findById(id);
    if (gateway) {
      if (gateway.devices.includes(deviceId)) {
        await Device.findByIdAndDelete(deviceId);
        gateway.devices.pull(deviceId);
        await gateway.save();
        res.json({ message: 'Device deleted successfully' });
      } else {
        res.status(404).json({ error: 'Device not found' });
      }
    } else {
      res.status(404).json({ error: 'Gateway not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
