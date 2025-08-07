/**
 * Payment processing utilities for Saudi market
 * Supports MADA, STC Pay, Stripe, and PayPal
 * Following BrainSAIT secure payment standards
 */

/**
 * MADA Payment Processing (Saudi Arabia's national payment system)
 */
export class MadaPaymentProcessor {
  constructor(env) {
    this.apiKey = env.MADA_API_KEY;
    this.merchantId = env.MADA_MERCHANT_ID;
    this.baseUrl = env.MADA_API_URL || "https://api.mada.sa/v1";
  }

  async processPayment(paymentData) {
    try {
      const { amount, currency = "SAR", cardData, orderId } = paymentData;

      // Validate required fields
      if (!this.apiKey || !this.merchantId) {
        throw new Error("MADA credentials not configured");
      }

      const requestBody = {
        merchant_id: this.merchantId,
        amount: Math.round(amount * 100), // Convert to halalat (smallest currency unit)
        currency,
        order_id: orderId,
        card_number: cardData.number,
        expiry_month: cardData.expiryMonth,
        expiry_year: cardData.expiryYear,
        cvv: cardData.cvv,
        cardholder_name: cardData.holderName,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(`${this.baseUrl}/payments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.message || "MADA payment failed",
          code: result.error_code,
        };
      }

      return {
        success: true,
        transactionId: result.transaction_id,
        status: result.status,
        amount: amount,
        currency,
        provider: "mada",
        providerResponse: result,
      };
    } catch (error) {
      console.error("MADA payment error:", error.message);
      return {
        success: false,
        error: "Payment processing failed",
        details: error.message,
      };
    }
  }

  async verifyPayment(transactionId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/payments/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();
      return {
        success: response.ok,
        status: result.status,
        transaction: result,
      };
    } catch (error) {
      console.error("MADA verification error:", error.message);
      return { success: false, error: error.message };
    }
  }
}

/**
 * STC Pay Processing (Saudi Telecom Company's digital wallet)
 */
export class StcPayProcessor {
  constructor(env) {
    this.apiKey = env.STC_PAY_API_KEY;
    this.merchantId = env.STC_PAY_MERCHANT_ID;
    this.baseUrl = env.STC_PAY_API_URL || "https://api.stcpay.com.sa/v2";
  }

  async processPayment(paymentData) {
    try {
      const { amount, currency = "SAR", phoneNumber, orderId } = paymentData;

      const requestBody = {
        merchant_id: this.merchantId,
        amount: amount,
        currency,
        order_id: orderId,
        customer_phone: phoneNumber,
        return_url: paymentData.returnUrl,
        callback_url: paymentData.callbackUrl,
        timestamp: Date.now(),
      };

      const response = await fetch(`${this.baseUrl}/payments/initiate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.message || "STC Pay payment failed",
          code: result.error_code,
        };
      }

      return {
        success: true,
        paymentUrl: result.payment_url,
        transactionId: result.transaction_id,
        status: "pending",
        provider: "stc_pay",
        providerResponse: result,
      };
    } catch (error) {
      console.error("STC Pay error:", error.message);
      return {
        success: false,
        error: "STC Pay processing failed",
        details: error.message,
      };
    }
  }

  async verifyPayment(transactionId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/payments/${transactionId}/status`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      const result = await response.json();
      return {
        success: response.ok,
        status: result.status,
        transaction: result,
      };
    } catch (error) {
      console.error("STC Pay verification error:", error.message);
      return { success: false, error: error.message };
    }
  }
}

/**
 * Stripe Payment Processing (International cards)
 */
export class StripeProcessor {
  constructor(env) {
    this.secretKey = env.STRIPE_SECRET_KEY;
    this.baseUrl = "https://api.stripe.com/v1";
  }

  async processPayment(paymentData) {
    try {
      const {
        amount,
        currency = "SAR",
        cardData,
        orderId,
        customerEmail,
      } = paymentData;

      // Create payment intent
      const intentResponse = await fetch(`${this.baseUrl}/payment_intents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          amount: Math.round(amount * 100),
          currency: currency.toLowerCase(),
          "metadata[order_id]": orderId,
          receipt_email: customerEmail || "",
          confirm: "true",
          "payment_method_data[type]": "card",
          "payment_method_data[card][number]": cardData.number,
          "payment_method_data[card][exp_month]": cardData.expiryMonth,
          "payment_method_data[card][exp_year]": cardData.expiryYear,
          "payment_method_data[card][cvc]": cardData.cvv,
        }),
      });

      const result = await intentResponse.json();

      if (!intentResponse.ok) {
        return {
          success: false,
          error: result.error?.message || "Stripe payment failed",
          code: result.error?.code,
        };
      }

      return {
        success: result.status === "succeeded",
        transactionId: result.id,
        status: result.status,
        amount: amount,
        currency,
        provider: "stripe",
        providerResponse: result,
      };
    } catch (error) {
      console.error("Stripe payment error:", error.message);
      return {
        success: false,
        error: "Stripe payment processing failed",
        details: error.message,
      };
    }
  }

  async verifyPayment(paymentIntentId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/payment_intents/${paymentIntentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      );

      const result = await response.json();
      return {
        success: response.ok,
        status: result.status,
        transaction: result,
      };
    } catch (error) {
      console.error("Stripe verification error:", error.message);
      return { success: false, error: error.message };
    }
  }
}

/**
 * PayPal Payment Processing
 */
export class PayPalProcessor {
  constructor(env) {
    this.clientId = env.PAYPAL_CLIENT_ID;
    this.clientSecret = env.PAYPAL_CLIENT_SECRET;
    this.baseUrl = env.PAYPAL_API_URL || "https://api.sandbox.paypal.com"; // Use live URL for production
  }

  async getAccessToken() {
    const auth = btoa(`${this.clientId}:${this.clientSecret}`);

    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const result = await response.json();
    return result.access_token;
  }

  async processPayment(paymentData) {
    try {
      const {
        amount,
        currency = "SAR",
        orderId,
        returnUrl,
        cancelUrl,
      } = paymentData;
      const accessToken = await this.getAccessToken();

      const orderData = {
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: orderId,
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
        },
      };

      const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.message || "PayPal payment failed",
          details: result.details,
        };
      }

      const approvalUrl = result.links.find(
        (link) => link.rel === "approve"
      )?.href;

      return {
        success: true,
        paymentUrl: approvalUrl,
        transactionId: result.id,
        status: result.status,
        provider: "paypal",
        providerResponse: result,
      };
    } catch (error) {
      console.error("PayPal payment error:", error.message);
      return {
        success: false,
        error: "PayPal payment processing failed",
        details: error.message,
      };
    }
  }

  async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      return {
        success: response.ok && result.status === "COMPLETED",
        status: result.status,
        transaction: result,
      };
    } catch (error) {
      console.error("PayPal capture error:", error.message);
      return { success: false, error: error.message };
    }
  }
}

/**
 * Main payment processor that routes to appropriate payment method
 */
export class PaymentProcessor {
  constructor(env) {
    this.env = env;
    this.processors = {
      mada: new MadaPaymentProcessor(env),
      stc_pay: new StcPayProcessor(env),
      stripe: new StripeProcessor(env),
      paypal: new PayPalProcessor(env),
    };
  }

  async processPayment(paymentData) {
    const { method } = paymentData;

    // Validate payment data
    if (!method || !this.processors[method]) {
      return {
        success: false,
        error: "Invalid payment method",
        supportedMethods: Object.keys(this.processors),
      };
    }

    try {
      // Log payment attempt (without sensitive data)
      console.log(
        `Processing ${method} payment for order ${paymentData.orderId}`
      );

      const result = await this.processors[method].processPayment(paymentData);

      // Store transaction record
      if (result.transactionId) {
        await this.storeTransaction({
          transaction_id: result.transactionId,
          order_id: paymentData.orderId,
          payment_method: method,
          amount: paymentData.amount,
          status: result.status || "pending",
          provider_response: JSON.stringify(result.providerResponse || {}),
        });
      }

      return result;
    } catch (error) {
      console.error(`Payment processing error for ${method}:`, error.message);
      return {
        success: false,
        error: "Payment processing failed",
        details: error.message,
      };
    }
  }

  async verifyPayment(transactionId, method) {
    if (!this.processors[method]) {
      return { success: false, error: "Invalid payment method" };
    }

    return await this.processors[method].verifyPayment(transactionId);
  }

  async storeTransaction(transactionData) {
    try {
      const result = await this.env.DB.prepare(
        `
          INSERT INTO payment_transactions
          (transaction_id, order_id, payment_method, amount, status, provider_response, created_at)
          VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `
      )
        .bind(
          transactionData.transaction_id,
          transactionData.order_id,
          transactionData.payment_method,
          transactionData.amount,
          transactionData.status,
          transactionData.provider_response
        )
        .run();

      return { success: true, id: result.meta.last_row_id };
    } catch (error) {
      console.error("Failed to store transaction:", error.message);
      return { success: false, error: error.message };
    }
  }
}
