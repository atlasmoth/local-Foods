import nc from "next-connect";
import stripeInit from "stripe";

const stripe = stripeInit(process.env.PRIVATE_STRIPE);
const handler = nc();

async function checkout(req, res) {
  const { items, total } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(500),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
export default handler.post(checkout);
