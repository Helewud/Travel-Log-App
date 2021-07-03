import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { listLogEntries } from "./API";

const navControlStyle = {
  right: 10,
  top: 10,
};

function App(props) {
  const [logEntries, setLogEntries] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 8,
    longitude: 11,
    zoom: 6,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  //   const markers = React.useMemo(
  //     () =>
  //       logEntries.map((entry) => (
  //         <Marker
  //           key={entry._id}
  //           longitude={entry.latitude}
  //           latitude={entry.longitude}
  //         >
  //           <img src="../public/pin.png" alt="location marker" />
  //           <p>{entry.title}</p>
  //         </Marker>
  //       )),
  //     [props.logEntries]
  //   );

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navControlStyle} />
      {logEntries.map((entry) => {
        return (
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div>{entry.title}</div>
            <svg
              style={{
                width: `calc(1vim * ${viewport.zoom})`,
                height: `calc(1vim * ${viewport.zoom})`,
              }}
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}

export default App;
