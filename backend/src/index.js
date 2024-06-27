const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());

const gatewaysRouter = require('./routes/gateways');
app.use('/gateways', gatewaysRouter);

const devicesRouter = require('./routes/devices');
app.use('/gateways/:id/devices', devicesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
