const express = require('express');
const Gateway = require('../models/gateway');
const Device = require('../models/device');

const router = express.Router();

const ERRORS = {
  GATEWAY_NOT_FOUND: 'Gateway not found',
  DEVICE_NOT_FOUND: 'Device not found',
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
  const gateway = await Gateway.findById(id);
  if (!gateway) throw new Error(ERRORS.GATEWAY_NOT_FOUND);
  return gateway;
};

const createDevice = async (vendor, status, gatewayId) => {
  const device = new Device({ vendor, status, gateway: gatewayId });
  await device.save();
  return device;
};

router.post('/:id/devices', async (req, res) => {
  try {
    const id = req.params.id;
    const { vendor, status } = req.body;

    if (!vendor || !status) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Vendor and status are required' });
    }

    const gateway = await findGatewayById(id);

    if (gateway.devices.length >= 10) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ERRORS.MAX_DEVICES_REACHED });
    }

    const device = await createDevice(vendor, status, id);
    gateway.devices.push(device._id);
    await gateway.save();
    await gateway.populate('devices');
    res.status(STATUS_CODES.CREATED).json(gateway);

  } catch (err) {
    if (err.message === ERRORS.GATEWAY_NOT_FOUND) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: err.message });
    }
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.delete('/:id/devices/:deviceId', async (req, res) => {
  try {
    const { id, deviceId } = req.params;

    const gateway = await findGatewayById(id);

    if (!gateway.devices.includes(deviceId)) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: ERRORS.DEVICE_NOT_FOUND });
    }

    await Device.findByIdAndDelete(deviceId);
    gateway.devices.pull(deviceId);
    await gateway.save();
    res.status(STATUS_CODES.OK).json({ message: 'Device deleted successfully' });

  } catch (err) {
    if (err.message === ERRORS.GATEWAY_NOT_FOUND) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: err.message });
    }
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

module.exports = router;
