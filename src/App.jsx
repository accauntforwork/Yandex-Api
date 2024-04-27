import React from "react";
import MapComponent from "./components/MapComponent";

const apiKey = "8baa8128-36e6-4213-8204-25405a618e1b";

const App = () => {
  const initialLocation = [55.7558, 37.6173]; // Example initial coordinates (Moscow)

  return (
    <div className="App">
      <h1>My Location Map</h1>
      <MapComponent initialLocation={initialLocation} apiKey={apiKey} />
    </div>
  );
};

export default App;
