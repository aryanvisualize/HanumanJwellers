import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

const generateOrderId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customerName, email, phone, shippingAddress, orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const orderId = generateOrderId();

    const order = new Order({
      orderId,
      customerName,
      email,
      phone,
      shippingAddress,
      orderItems,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error creating order' });
  }
});

export default router;
