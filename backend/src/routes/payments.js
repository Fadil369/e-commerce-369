const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @desc    Process Stripe payment
// @route   POST /api/payments/stripe
// @access  Private
router.post('/stripe', [auth], [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('currency').optional().isIn(['SAR', 'USD']).withMessage('Invalid currency'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
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

    const { amount, currency = 'SAR', orderId } = req.body;

    // Stripe integration would go here
    // For now, simulate payment processing
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount: amount * 100, // Stripe uses cents
      currency: currency.toLowerCase(),
      status: 'succeeded',
      orderId,
      created: Date.now(),
    };

    res.status(200).json({
      status: 'success',
      message: 'Payment processed successfully',
      data: {
        paymentIntent,
        clientSecret: `${paymentIntent.id}_secret_test`,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Process PayPal payment
// @route   POST /api/payments/paypal
// @access  Private
router.post('/paypal', [auth], [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('currency').optional().isIn(['SAR', 'USD']).withMessage('Invalid currency'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
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

    const { amount, currency = 'SAR', orderId } = req.body;

    // PayPal integration would go here
    // For now, simulate payment processing
    const payment = {
      id: `PAY-${Date.now()}`,
      amount,
      currency,
      status: 'approved',
      orderId,
      payerInfo: {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
      created: new Date().toISOString(),
    };

    res.status(200).json({
      status: 'success',
      message: 'PayPal payment processed successfully',
      data: {
        payment,
        approvalUrl: `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=${payment.id}`,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Process MADA payment (Saudi local)
// @route   POST /api/payments/mada
// @access  Private
router.post('/mada', [auth], [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('cardNumber').isLength({ min: 16, max: 16 }).withMessage('Invalid card number'),
  body('expiryMonth').isInt({ min: 1, max: 12 }).withMessage('Invalid expiry month'),
  body('expiryYear').isInt({ min: 2024 }).withMessage('Invalid expiry year'),
  body('cvv').isLength({ min: 3, max: 4 }).withMessage('Invalid CVV'),
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

    const { amount, orderId, cardNumber } = req.body;

    // MADA payment gateway integration would go here
    // For now, simulate payment processing
    const payment = {
      id: `MADA-${Date.now()}`,
      amount,
      currency: 'SAR',
      status: 'success',
      orderId,
      maskedCardNumber: `****-****-****-${cardNumber.slice(-4)}`,
      transactionId: `TXN-${Date.now()}`,
      created: new Date().toISOString(),
    };

    res.status(200).json({
      status: 'success',
      message: 'MADA payment processed successfully',
      data: {
        payment,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Process STC Pay payment (Saudi local)
// @route   POST /api/payments/stc-pay
// @access  Private
router.post('/stc-pay', [auth], [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('phoneNumber').matches(/^(\+966|0)?[5][0-9]{8}$/).withMessage('Invalid Saudi phone number'),
  body('otp').isLength({ min: 4, max: 6 }).withMessage('Invalid OTP'),
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

    const { amount, orderId, phoneNumber } = req.body;

    // STC Pay integration would go here
    // For now, simulate payment processing
    const payment = {
      id: `STC-${Date.now()}`,
      amount,
      currency: 'SAR',
      status: 'completed',
      orderId,
      phoneNumber: phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3'),
      transactionId: `STCPAY-${Date.now()}`,
      created: new Date().toISOString(),
    };

    res.status(200).json({
      status: 'success',
      message: 'STC Pay payment processed successfully',
      data: {
        payment,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get payment methods
// @route   GET /api/payments/methods
// @access  Public
router.get('/methods', (req, res) => {
  const paymentMethods = [
    {
      id: 'stripe',
      name: {
        en: 'Credit/Debit Card',
        ar: 'بطاقة ائتمان/خصم',
      },
      icon: 'credit-card',
      currencies: ['SAR', 'USD'],
      fees: 2.9,
      description: {
        en: 'Pay securely with your credit or debit card',
        ar: 'ادفع بأمان باستخدام بطاقة الائتمان أو الخصم',
      },
    },
    {
      id: 'paypal',
      name: {
        en: 'PayPal',
        ar: 'باي بال',
      },
      icon: 'paypal',
      currencies: ['SAR', 'USD'],
      fees: 3.4,
      description: {
        en: 'Pay with your PayPal account',
        ar: 'ادفع باستخدام حساب PayPal الخاص بك',
      },
    },
    {
      id: 'mada',
      name: {
        en: 'MADA',
        ar: 'مدى',
      },
      icon: 'mada',
      currencies: ['SAR'],
      fees: 1.5,
      description: {
        en: 'Pay with your Saudi MADA card',
        ar: 'ادفع باستخدام بطاقة مدى السعودية',
      },
    },
    {
      id: 'stc_pay',
      name: {
        en: 'STC Pay',
        ar: 'STC Pay',
      },
      icon: 'stc-pay',
      currencies: ['SAR'],
      fees: 0,
      description: {
        en: 'Pay instantly with STC Pay mobile wallet',
        ar: 'ادفع فوراً باستخدام محفظة STC Pay الرقمية',
      },
    },
  ];

  res.status(200).json({
    status: 'success',
    data: {
      paymentMethods,
    },
  });
});

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
router.post('/verify', [auth], [
  body('paymentId').notEmpty().withMessage('Payment ID is required'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
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

    const { paymentId, orderId } = req.body;

    // Payment verification logic would go here
    // For now, simulate verification
    const verification = {
      paymentId,
      orderId,
      status: 'verified',
      amount: 150.00,
      currency: 'SAR',
      verifiedAt: new Date().toISOString(),
    };

    res.status(200).json({
      status: 'success',
      message: 'Payment verified successfully',
      data: {
        verification,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;