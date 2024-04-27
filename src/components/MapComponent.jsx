import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark, Route } from "yandex-maps";

const MapComponent = ({ initialLocation, apiKey }) => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(initialLocation);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const ymaps = window.ymaps;

    ymaps.ready(() => {
      const mapInstance = new ymaps.Map("map", {
        center: userLocation,
        zoom: 15,
        controls: ["zoomControl", "searchControl", "trafficControl"],
      });

      setMap(mapInstance);
    });
  }, [userLocation, apiKey]);

  const handleSearch = (event) => {
    const address = event.target.value;

    if (address) {
      ymaps
        .geocode(address, { results: 1 })
        .then((response) => {
          const geocodedObject = response.geoObjects.get(0);
          const coordinates = geocodedObject.geometry.getCoordinates();

          setDestination(coordinates);
        })
        .catch((error) => {
          console.error("Geocoding error:", error);
        });
    } else {
      setDestination(null);
      setRoute(null);
    }
  };

  useEffect(() => {
    if (map && destination) {
      ymaps
        .route([userLocation, destination], {
          travelMode: "driving",
          avoidTrafficJams: true,
        })
        .then((routeObject) => {
          setRoute(routeObject);
        })

        .catch((error) => {
          console.error("Routing error:", error);
        });
    }
  }, [map, userLocation, destination]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter destination address"
        onChange={handleSearch}
      />
      <YMaps query={{ apikey: apiKey }}>
        <Map width="100%" height="400px" instance={map}>
          {userLocation && <Placemark coordinates={userLocation} />}
          {destination && (
            <Route
              options={{ geodesic: false }}
              multiRoute={false}
              route={route}
            />
          )}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComponent;
