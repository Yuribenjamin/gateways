const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());

const gatewaysRouter = require('./routes/gateways');
app.use('/gateways', gatewaysRouter);

const devicesRouter = require('./routes/devices');
app.use('/gateways/devices', devicesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
