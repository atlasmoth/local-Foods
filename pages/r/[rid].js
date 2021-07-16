import { useState } from "react";
import Navbar from "../../components/navbar";
import { connectToDatabase } from "../../utils/db";
import Tabs from "../../components/tabs";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Restaurant({ data }) {
  const keys = Array.from(new Set(Object.keys(data.menu)));
  const [current, setCurrent] = useState(keys[0]);
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiYmlnZWUiLCJhIjoiY2syYTcyYnRsM242czNjbXZkdmtwcWRlMCJ9.817UiaB2N2ZXxL3q29zxIA",
  });
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
              {Array.from(
                new Array(
                  Math.round(parseFloat(data?.user_rating?.aggregate_rating))
                ),
                () => (
                  <span
                    className="fa fa-star star-checked"
                    key={Math.random() * Math.random()}
                  ></span>
                )
              ).map((i) => i)}
              {Array.from(
                new Array(
                  5 -
                    Math.round(parseFloat(data?.user_rating?.aggregate_rating))
                ),
                () => (
                  <span
                    className="fa fa-star"
                    key={Math.random() * Math.random()}
                  ></span>
                )
              ).map((i) => i)}
            </span>
            <span>({data.user_rating.votes})</span>
          </p>
        </div>
      </div>
      <div className="map">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
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
      <Tabs
        items={data.menu[current]}
        place={{
          name: data.name,
          id: data._id,
          location: data["data-location"],
        }}
      />
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
