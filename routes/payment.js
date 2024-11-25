const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = Stripe('your_stripe_secret_key'); // Replace with your Stripe Secret Key

// Payment route
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Create a PaymentIntent with the provided amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents (e.g., $10 = 1000 cents)
      currency: currency || 'usd',
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
