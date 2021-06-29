import Navbar from "./../components/navbar";
import Bottom from "./../components/bottom";
import { connectToDatabase } from "./../utils/db";
import Cookie from "next-cookies";

export default function Orders({ orders }) {
  return (
    <div className="box">
      <Navbar title="Orders" />
      {orders.map((i) => {
        const dataName = i.price_data.product_data.name.split("@");
        return (
          <div
            key={i.price_data.product_data.name + Math.random() * Math.random()}
          >
            <div className="tab">
              <div className="tab-image">
                <img
                  src="https://via.placeholder.com/70/eee/fd6b0"
                  alt="Dummy"
                />
              </div>
              <div className="tab-desc">
                <span>{dataName[0]}</span>
                <span>{dataName[1]}</span>
                <span
                  style={{
                    color: "#fd6b01",
                  }}
                >
                  &#x20A6;{i.price_data.unit_amount / 100}
                </span>
              </div>
              <div className="tab-range">
                <span
                  style={{
                    color: "#fd6b01",
                  }}
                >
                  &#x20A6; {(i.price_data.unit_amount * i.quantity) / 100} (
                  {i.quantity})
                </span>
              </div>
              <div className="tab-check">
                <span>
                  <input
                    type="checkbox"
                    name="favorite"
                    id="favorite"
                    defaultChecked={true}
                  />
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <Bottom />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { foodsUser } = Cookie(ctx);
  try {
    const { db } = await connectToDatabase();
    const orders = await db
      .collection("orders")
      .aggregate([
        {
          $match: {
            "price_data.product_data.metadata.creator": foodsUser._id,
          },
        },
      ])
      .toArray();
    return {
      props: {
        orders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
