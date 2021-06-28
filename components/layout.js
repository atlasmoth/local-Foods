import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLIC_STRIPE);

export default function Layout({ children }) {
  return (
    <CartProvider
      mode="client-only"
      stripe={stripePromise}
      successUrl="https://stripe.com"
      cancelUrl="https://twitter.com/dayhaysoos"
      currency="USD"
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
    >
      {children}
    </CartProvider>
  );
}
