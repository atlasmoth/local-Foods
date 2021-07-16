import React, { useEffect, useRef } from "react";
import Cookie from "js-cookie";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmlnZWUiLCJhIjoiY2syYTcyYnRsM242czNjbXZkdmtwcWRlMCJ9.817UiaB2N2ZXxL3q29zxIA";

const Map = ({ data }) => {
  const mapRef = useRef();
  useEffect(() => {
    new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }, []);

  return (
    <div style={{ height: "60vh" }} className="map">
      {/* <div id="map">

      </div>
      <MapGL
        ref={mapRef}
        width="100%"
        height="100%"
        latitude={JSON.parse(Cookie.get("foodsUser")).latitude}
        longitude={JSON.parse(Cookie.get("foodsUser")).longitude}
        zoom={1}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        scrollZoom={true}
        onLoad={(e) => {
          var directions = new MapboxDirections({
            accessToken: MAPBOX_TOKEN,
            unit: "metric",
            profile: "mapbox/driving",
            alternatives: false,
            geometries: "geojson",
            controls: { instructions: true },
          });
          directions.setOrigin([
            JSON.parse(Cookie.get("foodsUser")).longitude,
            JSON.parse(Cookie.get("foodsUser")).latitude,
          ]);

          directions.setDestination([
            Number(data.longitude),
            Number(data.latitude),
          ]);
          e.target.addControl(directions, "bottom-right");
        }}
      >
        <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-right"
        />
      </MapGL> */}
    </div>
  );
};

export default Map;
