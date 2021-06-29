import Layout from "./../components/layout";

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
  return <div></div>;
}
