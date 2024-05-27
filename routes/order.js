const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/order', async (req, res) => {
  const {
    decoration_id,
    decoration_type,
    decoration_cost,
    decoration_images,
    user_details,
    event_date,
    event_place,
  } = req.body;

  try {
    const order = new Order({
      decoration_id,
      decoration_type,
      decoration_cost,
      decoration_images,
      user_details,
      event_date,
      event_place,
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/orders', async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // routes/api.js
router.post('/userorders', authMiddleware, async (req, res) => {
  try {
    const { name, mobile } = req.body;
    console.log(name,mobile)
    // Query the database to find orders based on user details
    const orders = await Order.find({ 'user_details.name': name, 'user_details.mobile': mobile });
    console.log(orders)
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
