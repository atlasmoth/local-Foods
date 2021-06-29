import nc from "next-connect";
import stripeInit from "stripe";

const stripe = stripeInit(process.env.PRIVATE_STRIPE);
const handler = nc();

async function checkout(req, res) {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:3000/checkout",
      cancel_url: "http://localhost:3000/checkout",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
}
export default handler.post(checkout);