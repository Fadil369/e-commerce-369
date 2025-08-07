const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory cart storage (in production, use Redis or database)
let carts = {};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const cart = carts[userId] || { items: [], total: 0 };

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
router.post('/add', [auth], [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('size').notEmpty().withMessage('Size is required'),
  body('color').optional().isString(),
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

    const userId = req.user._id.toString();
    const { productId, quantity, size, color } = req.body;

    // Initialize cart if doesn't exist
    if (!carts[userId]) {
      carts[userId] = { items: [], total: 0 };
    }

    const cart = carts[userId];

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        size,
        color,
        addedAt: new Date(),
      });
    }

    // Recalculate total (simplified - in production, fetch actual product prices)
    cart.total = cart.items.reduce((total, item) => total + (item.quantity * 100), 0); // Placeholder price

    res.status(200).json({
      status: 'success',
      message: 'Item added to cart',
      data: {
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
router.put('/update', [auth], [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be 0 or greater'),
  body('size').notEmpty().withMessage('Size is required'),
  body('color').optional().isString(),
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

    const userId = req.user._id.toString();
    const { productId, quantity, size, color } = req.body;

    if (!carts[userId]) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    const cart = carts[userId];
    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found in cart',
      });
    }

    if (quantity === 0) {
      // Remove item
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate total
    cart.total = cart.items.reduce((total, item) => total + (item.quantity * 100), 0);

    res.status(200).json({
      status: 'success',
      message: 'Cart updated',
      data: {
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
router.delete('/remove', [auth], [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('size').notEmpty().withMessage('Size is required'),
  body('color').optional().isString(),
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

    const userId = req.user._id.toString();
    const { productId, size, color } = req.body;

    if (!carts[userId]) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    const cart = carts[userId];
    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found in cart',
      });
    }

    cart.items.splice(itemIndex, 1);
    cart.total = cart.items.reduce((total, item) => total + (item.quantity * 100), 0);

    res.status(200).json({
      status: 'success',
      message: 'Item removed from cart',
      data: {
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
router.delete('/clear', auth, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    carts[userId] = { items: [], total: 0 };

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
      data: {
        cart: carts[userId],
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;