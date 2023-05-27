## GateWays API

The backend is a REST API that provides the following endpoints:

## Installation

## create a .env file in the root directory and add the following variables

```bash
PORT=8000
MONGO_DATABASE_URL=mongodb://localhost:27017/gateways
```

## Install dependencies

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Gateways API Endpoints Summary

### POST /gateways - Create a gateway (url example: http://localhost:8000/gateways)

#### Request

```json
{
  "serial": "1",
  "name": "Gateway one",
  "ip": "192.168.10.1"
}
```

#### Response

```json
{
  "serial": "1",
  "name": "Gateway one",
  "ip": "192.168.10.1",
  "devices": [],
  "_id": "646bc3e95b7b912bede22bab"
}
```

### POST /gateways/:id/devices - Create a device (url example: http://localhost:8000/gateways/646bc3e95b7b912bede22bab/devices)

#### Request

```json
{
  "vendor": "apple",
  "status": "online"
}
```

#### Response

```json
{
  "_id": "646bc3e95b7b912bede22bab",
  "serial": "1",
  "name": "Gateway one",
  "ip": "192.168.10.1",
  "devices": [
    {
      "_id": "646bc4035b7b912bede22bb0",
      "uuid": "d8e4c7a7-1746-4410-91a9-681bcced5b4a",
      "vendor": "apple",
      "status": "online",
      "dateCreated": "2023-05-22T19:35:31.448Z"
    }
  ]
}
```

### GET /gateways - get all gateways (url example: http://localhost:8000/gateways)

#### Response

```json
[
  {
    "_id": "646bc3e95b7b912bede22bab",
    "serial": "1",
    "name": "Gateway",
    "ip": "192.168.10.1",
    "devices": [
      {
        "_id": "646bc4035b7b912bede22bb0",
        "uuid": "d8e4c7a7-1746-4410-91a9-681bcced5b4a",
        "vendor": "apple",
        "status": "online",
        "dateCreated": "2023-05-22T19:35:31.448Z"
      }
    ]
  },
  {
    "_id": "646bcf04f58c4b5cda97b97b",
    "serial": "2",
    "name": "Gateway two",
    "ip": "192.168.10.10",
    "devices": []
  }
]
```

### GET /gateways/:id - get a gateway by id (url example: http://localhost:8000/gateways/646bc3e95b7b912bede22bab)

#### Response

```json
{
  "_id": "646bc3e95b7b912bede22bab",
  "serial": "1",
  "name": "Gateway one",
  "ip": "192.168.10.1",
  "devices": [
    {
      "_id": "646bc4035b7b912bede22bb0",
      "uuid": "d8e4c7a7-1746-4410-91a9-681bcced5b4a",
      "vendor": "apple",
      "status": "online",
      "dateCreated": "2023-05-22T19:35:31.448Z"
    }
  ]
}
```

### DELETE /gateways/:id - delete a gateway by id (url example: http://localhost:8000/gateways/646bc3e95b7b912bede22bab)

#### Response

```json
{
  "message": "Gateway deleted successfully"
}
```

### DELETE /gateways/:id/devices/:deviceId - delete a device by id (url example: http://localhost:8000/gateways/646bc3e95b7b912bede22bab/devices/646bc4035b7b912bede22bb0)

#### Response

```json
{
  "message": "Device deleted successfully"
}
```
