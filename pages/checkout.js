import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/checkoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLIC_STRIPE);

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <div className="box">
        <CheckoutForm />
      </div>
    </Elements>
  );
}
