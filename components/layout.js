import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLIC_STRIPE);

export default function Layout({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
