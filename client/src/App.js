import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";

const navControlStyle = {
  right: 10,
  top: 10,
};

function App(props) {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

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

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      doubleClickZoom={false}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      <NavigationControl style={navControlStyle} />
      {logEntries.map((entry) => {
        return (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() =>
                  setShowPopup({
                    ...showPopup,
                    [entry._id]: true,
                  })
                }
              >
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                    transform: "translate(-50%, -100% )",
                  }}
                  viewBox="0 0 24 24"
                  stroke="black"
                  stroke-width="1"
                  fill="yellow"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {showPopup[entry._id]
              ? showPopup && (
                  <Popup
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => setShowPopup({})}
                    anchor="top"
                  >
                    <div className="popup">
                      <h4>{entry.title}</h4>
                      <p>{entry.comments}</p>
                      <small>
                        Visited on:{" "}
                        {new Date(entry.visitDate).toLocaleDateString()}
                      </small>
                    </div>
                  </Popup>
                )
              : null}
            {addEntryLocation ? (
              <>
                <Popup
                  latitude={addEntryLocation.latitude}
                  longitude={addEntryLocation.longitude}
                  //   closeButton={true}
                  //   closeOnClick={true}
                  //   onClose={() => setAddEntryLocation(null)}
                  //   anchor="top"
                >
                  <div className="popup">
                    <h4>Add your new log entry here</h4>
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
