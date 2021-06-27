import { useState } from "react";
import Navbar from "../../components/navbar";
import { connectToDatabase } from "../../utils/db";
import Tabs from "../../components/tabs";
import Bottom from "./../../components/bottom";

export default function Restaurant({ data }) {
  const keys = Array.from(new Set(Object.keys(data.menu)));
  const [current, setCurrent] = useState(keys[0]);
  return (
    <div className="box">
      <Navbar title={data.name} />
      <div className="item-tray">
        <div className="tray-img">
          <img src={data.thumb} alt="thumb" />
        </div>
        <div className="tray-meta">
          <p>{data.name}</p>
          <p>{data["data-location"].address}</p>
          <p>
            <span>
              {parseFloat(data.user_rating.aggregate_rating).toFixed(1)}
            </span>
            <span>
              <span className="fa fa-star star-checked"></span>
              <span className="fa fa-star star-checked"></span>
              <span className="fa fa-star star-checked"></span>
              <span className="fa fa-star "></span>
              <span className="fa fa-star "></span>
            </span>
            <span>({data.user_rating.votes})</span>
          </p>
        </div>
      </div>
      <div
        className="slider"
        style={{
          gridTemplateColumns: `repeat(${keys.length}, 100px)`,
        }}
      >
        {keys.map((k) => (
          <div
            key={k}
            className={`slide ${k === current && "selected"}`}
            onClick={(e) => {
              setCurrent(k);
            }}
          >
            {k}
          </div>
        ))}
      </div>
      <Tabs items={data.menu[current]} />
      <Bottom />
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const { params } = ctx;

  try {
    const { db } = await connectToDatabase();

    const data = await db
      .collection("restaurants")
      .findOne({ _id: params.rid });

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}
