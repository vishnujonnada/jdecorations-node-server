// models/Decoration.js

const mongoose = require('mongoose');

const decorationSchema = new mongoose.Schema({
  decoration_id: { type: Number, required: true, unique: true },
  decoration_type: { type: String, required: true },
  decoration_cost: { type: String, required: true },
  decoration_images: { type: [String], required: true },
  contact_details: { type: String, required: true },
});

const Decoration = mongoose.model('Decoration', decorationSchema);

module.exports = Decoration;
