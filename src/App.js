import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXlhbmJoYWR1cnkiLCJhIjoiY2tocThrMzZ3MWk5MDJ2bXg1bjZhYWg1byJ9.u6SDp4CGJ0B5_SWbQsv1ZA";
function App() {
  const mapContainerRef = useRef(null);
  const [mapProp, setmapProp] = useState({
    lng: 78,
    lat: 21,
    zoom: 3,
  });
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapProp.lng, mapProp.lat],
      zoom: mapProp.zoom,
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setmapProp({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    // Add geolocate control to the map.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocate);
    map.on("load", function () {
      geolocate.trigger();
    });

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      steps: true,
      language: "en",
    });

    map.addControl(directions, "top-left");

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <div className="sidebarStyle">
        {/* <div>
          Longitude: {mapProp.lng} | Latitude: {mapProp.lat} | Zoom:
          {mapProp.zoom}
        </div> */}
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
}

export default App;
