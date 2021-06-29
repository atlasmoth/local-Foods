import Search from "./../components/search";
import Tray from "./../components/tray";
import { connectToDatabase } from "./../utils/db";
import Cookie from "next-cookies";
import Nav from "./../components/navbar";
import Bottom from "./../components/bottom";
import Results from "./../components/results";
import { useState } from "react";

export default function UserApp({ items, orders }) {
  console.log(orders);
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

      <Bottom />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { foodsUser } = Cookie(ctx);

  try {
    const { db } = await connectToDatabase();
    const docs = await db
      .collection("restaurants")
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(-73.935242), parseFloat(40.73061)],
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
