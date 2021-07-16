import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";

import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Cookie from "js-cookie";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmlnZWUiLCJhIjoiY2syYTcyYnRsM242czNjbXZkdmtwcWRlMCJ9.817UiaB2N2ZXxL3q29zxIA";

const Map = ({ data }) => {
  const [viewport, setViewport] = useState({
    latitude: 40.53,
    longitude: 34.34,
    zoom: 3,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  useEffect(() => {
    const { longitude, latitude } = JSON.parse(Cookie.get("foodsUser"));
    setViewport((v) => ({ ...v, latitude, longitude }));
  }, []);
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "40vh" }} className="map">
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onLoad={(e) => {
          e.target.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [viewport.longitude, viewport.latitude],
                  [-122.483482, 37.833174],
                  [-122.483396, 37.8327],
                  [-122.483568, 37.832056],
                  [-122.48404, 37.831141],
                  [-122.48404, 37.830497],
                  [-122.483482, 37.82992],
                  [-122.483568, 37.829548],
                  [-122.48507, 37.829446],
                  [-122.4861, 37.828802],
                  [-122.486958, 37.82931],
                  [-122.487001, 37.830802],
                  [-122.487516, 37.831683],
                  [-122.488031, 37.832158],
                  [-122.488889, 37.832971],
                  [-122.489876, 37.832632],
                  [-122.490434, 37.832937],
                  [-122.49125, 37.832429],
                  [-122.491636, 37.832564],
                  [-122.492237, 37.833378],
                  [
                    Number(data.coordinates.longitude),
                    Number(data.coordinates.latitude),
                  ],
                ],
              },
            },
          });
          e.target.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#fd6b01",
              "line-width": 5,
            },
          });
        }}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-right"
        />
      </MapGL>
    </div>
  );
};

export default Map;
