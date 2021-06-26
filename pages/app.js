import Search from "./../components/search";
import Tray from "./../components/tray";
import { connectToDatabase } from "./../utils/db";
import Cookie from "next-cookies";

export default function UserApp({ items }) {
  const [data] = items;

  return (
    <div className="box">
      <Search />
      <Tray items={[]} title="Restaurants near you" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { foodsUser } = Cookie(ctx);
  console.log(foodsUser);
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

    return {
      props: {
        items: JSON.parse(JSON.stringify(docs)),
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
