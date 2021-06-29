import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./../components/navbar";
import Bottom from "./../components/bottom";
import { useCart } from "./../contexts/cartContext";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLIC_STRIPE);

export default function Checkout() {
  const context = useCart();

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetch("/api/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: context.state.items }),
    });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(errror);
    }
  };
  return (
    <div className="box">
      {context?.state?.items.length ? (
        <>
          <Navbar title="Checkout" />
          <button role="link" onClick={handleClick}>
            Checkout
          </button>
          <Bottom />
        </>
      ) : (
        <h3>Cart is currently empty</h3>
      )}
    </div>
  );
}
