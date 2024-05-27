const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const authRoutes = require('./routes/auth');
const cors = require('cors'); 
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order');


const app = express();

app.use('/uploads', express.static('uploads'));
app.use(cors()); // Use cors middleware
// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
