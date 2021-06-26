import Search from "./../components/search";
import Tray from "./../components/tray";
import { connectToDatabase } from "./../utils/db";
import Cookie from "next-cookies";
// import { ObjectId } from "mongodb";
import { useEffect } from "react";
import { ObjectId } from "mongodb";

export default function UserApp({ items, orders }) {
  console.log(orders);
  const [data] = items;
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="box">
      <Search />
      <Tray items={[]} title="Restaurants near you" />
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
            query: {
              "loc.type": "Point",
              has_online_delivery: { $ne: 0 },
              has_table_booking: { $ne: 0 },
            },
            spherical: true,
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
    const orders = await db.collection("orders").aggregate([
      {
        $match: {
          creator: ObjectId(foodsUser._id),
        },
      },
    ]);
    return {
      props: {
        items: JSON.parse(JSON.stringify(docs)),
        orders,
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
