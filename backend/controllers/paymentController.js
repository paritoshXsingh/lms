import Stripe from "stripe";

const getStripeClient = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(secretKey);
};

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    if (!Number.isInteger(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive integer in the smallest currency unit",
      });
    }

    const stripe = getStripeClient();
    const args = {
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    };

    const paymentIntent = await stripe.paymentIntents.create(args);

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Create payment intent error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
