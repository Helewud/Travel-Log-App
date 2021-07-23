import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
} from "react-map-gl";
import { allLogEntries } from "./api";
import LogForm from "./formCard";
import DisplayCard from "./DisplayCard";

const navControlStyle = {
  right: 10,
  top: 10,
};

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, togglePopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 9,
    longitude: 7,
    zoom: 6,
  });
  const getEntries = async () => {
    const logEntries = await allLogEntries();
    setLogEntries(logEntries);
  };
  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100VW"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      doubleClickZoom={false}
      maxZoom={16}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
      keyboard={false}
    >
      <NavigationControl style={navControlStyle} />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />

      {logEntries.map((location) => {
        return (
          <>
            <Marker
              key={location._id}
              latitude={location.latitude}
              longitude={location.longitude}
            >
              <div
                onClick={() =>
                  togglePopup({
                    [location._id]: true,
                  })
                }
              >
                <svg
                  style={{
                    transform: "translate(-50%, -100% )",
                  }}
                  height="24"
                  width="24"
                  z-index="-1"
                  position="absolute"
                >
                  <path
                    d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"
                    fill="#e74c3c"
                  />
                  <path
                    d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z"
                    fill="#c0392b"
                  />
                </svg>
              </div>
            </Marker>

            {showPopup[location._id] ? (
              <Popup
                latitude={location.latitude}
                longitude={location.longitude}
                closeButton={true}
                closeOnClick={true}
                dynamicPosition={true}
                onClose={() => togglePopup({})}
                anchor="top"
              >
                <DisplayCard location={location} />
              </Popup>
            ) : null}

            {addEntryLocation ? (
              <>
                <Marker
                  key={location._id}
                  latitude={addEntryLocation.latitude}
                  longitude={addEntryLocation.longitude}
                >
                  <div>
                    <svg
                      style={{
                        transform: "translate(-50%, -100% )",
                      }}
                      height="24"
                      width="24"
                      stroke="black"
                      strokeWidth=".2"
                    >
                      <path
                        d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"
                        fill="yellow"
                      />
                      <path
                        d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z"
                        fill="#c0392b"
                      />
                    </svg>
                  </div>
                </Marker>
                <Popup
                  latitude={addEntryLocation.latitude}
                  longitude={addEntryLocation.longitude}
                  closeButton={true}
                  closeOnClick={true}
                  dynamicPosition={true}
                  onClose={() => togglePopup({})}
                  anchor="top"
                >
                  <div className="display-card">
                    <LogForm
                      onClose={() => {
                        setAddEntryLocation(null);
                        getEntries();
                      }}
                      location={addEntryLocation}
                    />
                  </div>
                </Popup>
              </>
            ) : null}
          </>
        );
      })}
    </ReactMapGL>
  );
}

export default App;
