import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useRef, useCallback } from "react";

import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Cookie from "js-cookie";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmlnZWUiLCJhIjoiY2syYTcyYnRsM242czNjbXZkdmtwcWRlMCJ9.817UiaB2N2ZXxL3q29zxIA";

const Map = ({ data }) => {
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
    <div style={{ height: "50vh" }} className="map">
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
      </MapGL>
    </div>
  );
};

export default Map;
