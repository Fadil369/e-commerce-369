const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory order storage (in production, use database)
let orders = [];
let orderCounter = 1000;

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', [auth], [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').isIn(['stripe', 'paypal', 'mada', 'stc_pay']).withMessage('Invalid payment method'),
], async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Calculate totals (simplified)
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 25; // Free shipping over 200 SAR
    const tax = subtotal * 0.15; // 15% VAT
    const total = subtotal + shipping + tax;

    const order = {
      id: `ORD-${orderCounter++}`,
      userId: req.user._id,
      items,
      subtotal,
      shipping,
      tax,
      total,
      currency: 'SAR',
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    orders.push(order);

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    const userOrders = orders.filter(order => order.userId.toString() === req.user._id.toString());

    res.status(200).json({
      status: 'success',
      data: {
        orders: userOrders,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', auth, async (req, res, next) => {
  try {
    const order = orders.find(order => 
      order.id === req.params.id && 
      order.userId.toString() === req.user._id.toString()
    );

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
router.put('/:id/status', [auth], [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
], async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const orderIndex = orders.findIndex(order => 
      order.id === req.params.id && 
      order.userId.toString() === req.user._id.toString()
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    orders[orderIndex].orderStatus = req.body.status;
    orders[orderIndex].updatedAt = new Date();

    res.status(200).json({
      status: 'success',
      message: 'Order status updated',
      data: {
        order: orders[orderIndex],
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put('/:id/cancel', auth, async (req, res, next) => {
  try {
    const orderIndex = orders.findIndex(order => 
      order.id === req.params.id && 
      order.userId.toString() === req.user._id.toString()
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    const order = orders[orderIndex];

    if (order.orderStatus !== 'pending' && order.orderStatus !== 'processing') {
      return res.status(400).json({
        status: 'error',
        message: 'Order cannot be cancelled at this stage',
      });
    }

    orders[orderIndex].orderStatus = 'cancelled';
    orders[orderIndex].updatedAt = new Date();

    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
      data: {
        order: orders[orderIndex],
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;