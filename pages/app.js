import Search from "./../components/search";
import Tray from "./../components/tray";
import { connectToDatabase } from "./../utils/db";
import Cookie from "next-cookies";
import Nav from "./../components/navbar";
import Results from "./../components/results";
import { useState } from "react";
import Link from "next/link";

export default function UserApp({ items, orders }) {
  const [{ byDistance, byRating }] = items;
  const [searchRes, setSearchRes] = useState([]);

  return (
    <div className="box">
      <Nav />
      <Search load={(data) => setSearchRes(data)} />
      {searchRes.length ? (
        <Results items={searchRes} />
      ) : (
        <>
          <Tray items={byDistance} title="Restaurants near you" />
          <Tray items={byRating} title="Highest rated" />
        </>
      )}
      <h4
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1rem",
        }}
      >
        <span>Recent Orders</span>
        <span style={{ color: "blue" }}>
          <Link href="/orders">
            <a>View More</a>
          </Link>
        </span>
      </h4>
      {orders.map((i) => {
        const dataName = i.price_data.product_data.name.split("@");
        const orderDate = new Date(
          i.price_data.product_data.metadata.book +
            ":" +
            i.price_data.product_data.metadata.time
        );

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
                  <div
                    className="order-box"
                    style={{
                      backgroundColor: `${
                        orderDate.getTime() > Date.now()
                          ? "green"
                          : "var(--base-orange)"
                      }`,
                    }}
                  ></div>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { foodsUser } = Cookie(ctx);
  console.log(foodsUser.longitude);
  console.log(foodsUser.latitude);
  try {
    const { db } = await connectToDatabase();
    const docs = await db
      .collection("restaurants")
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [
                foodsUser?.longitude || parseFloat(-73.935242),
                foodsUser?.latitude || parseFloat(40.73061),
              ],
            },
            distanceField: "distance",
            spherical: true,
            distanceMultiplier: 0.001,
          },
        },
        {
          $project: {
            menu: false,
          },
        },
        {
          $facet: {
            byDistance: [
              {
                $sort: { distance: 1 },
              },
              {
                $limit: 30,
              },
            ],
            byRating: [
              {
                $sort: { "user_rating.aggregate_rating": -1 },
              },
              {
                $limit: 30,
              },
            ],
          },
        },
      ])
      .toArray();
    const orders = await db
      .collection("orders")
      .aggregate([
        {
          $match: {
            "price_data.product_data.metadata.creator": foodsUser._id,
          },
        },
        {
          $sort: { lastModified: -1 },
        },
        { $limit: 5 },
      ])
      .toArray();
    return {
      props: {
        items: JSON.parse(JSON.stringify(docs)),
        orders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (error) {
    console.log("failed to fetch", error);
    return {
      props: {
        items: [],
      },
    };
  }
}
