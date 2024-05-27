// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  decoration_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Decoration', // Reference to the Decoration model
    required: true
  },
  decoration_type: {
    type: String,
    required: true
  },
  decoration_cost: {
    type: Number,
    required: true
  },
  decoration_images: {
    type: [String], // Array of image URLs
    required: true
  },
  user_details: {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    }
  },
  event_date: {
    type: Date,
    required: true
  },
  event_place: {
    type: String,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
