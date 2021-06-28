import Layout from "./../components/layout";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react/cjs/react.development";

export default function Checkout() {
  // console.log(process.env.NEXT_PUBLIC_PUBLIC_STRIPE);

  return (
    <div className="box">
      <Layout>
        <Elements />
      </Layout>
    </div>
  );
}

function Elements() {
  const productData = [
    {
      name: "Bananas",
      id: "some_unique_id_1",
      price: 400,
      image: "https://www.fillmurray.com/300/300",
      currency: "USD",
      product_data: {
        metadata: {
          type: "fruit",
        },
      },
      price_data: {
        recurring: {
          interval: "week",
        },
      },
    },
    {
      name: "Tangerines",
      id: "some_unique_id_2",
      price: 100,
      image: "https://www.fillmurray.com/300/300",
      currency: "USD",
      product_data: {
        metadata: {
          type: "fruit",
        },
      },
      price_data: {
        recurring: {
          interval: "week",
        },
      },
    },
  ];
  const { totalPrice, redirectToCheckout, cartCount, loadCart } =
    useShoppingCart();
  useEffect(() => {
    loadCart(productData);
  }, []);
  return (
    <div>
      <p>Number of Items: {cartCount}</p>
      <p>Total: {totalPrice}</p>

      {/* Redirects the user to Stripe */}
      <button onClick={() => redirectToCheckout()}>Checkout</button>
    </div>
  );
}
