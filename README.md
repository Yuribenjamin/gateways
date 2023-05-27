# Gateways

A sample project for managing gateways, written in node.js with express.js and mongodb, a part of hiring process for musala soft created by Ibrahim Ragab.

## Overview

This sample project is managing gateways - master devices that control multiple peripheral devices.

## Requirements

- Create a REST service (JSON/HTTP) for storing and retrieving information about gateways and their associated devices.

- Store the information in the database

- Validate the fields marked as “to be validated” and return an error if they are invalid.

- Limit the number of peripheral devices per gateway to 10.

- Provide operations for displaying all gateways and their devices, and displaying details for a single gateway.

- Provide operations for adding and removing a device from a gateway.

- Each gateway has:

  - a unique serial number (string),

  - human-readable name (string),

  - IPv4 address (to be validated),

  - multiple associated peripheral devices.

- Each peripheral device has:

  - a UID (number),

  - vendor (string),

  - date created,

  - status - online/offline.
