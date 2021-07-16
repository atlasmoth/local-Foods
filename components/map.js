import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";

import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmlnZWUiLCJhIjoiY2syYTcyYnRsM242czNjbXZkdmtwcWRlMCJ9.817UiaB2N2ZXxL3q29zxIA";

const Map = ({ latitude, longitude }) => {
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
