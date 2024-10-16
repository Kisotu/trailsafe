import { useState, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import { HexColorPicker } from "react-colorful";
import { useUser } from "@clerk/clerk-react";
import { MapPin, List, Search, Edit2, Trash2 } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

import { createPin, fetchPins } from "../api";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MyMap() {
  const { user } = useUser();

  const [viewport, setViewport] = useState({
    latitude: -0.0236,
    longitude: 37.9062,
    zoom: 6,
    bearing: 0,
    pitch: 30,
  });

  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [newTrail, setNewTrail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addedBy, setAddedBy] = useState(user?.firstName);
  const [pins, setPins] = useState([]);

  // Fetch all pins
  useEffect(() => {
    async function fetchPinsData() {
      try {
        const fetchedPins = await fetchPins();
        setPins(fetchedPins.data); // Save pins to state
      } catch (err) {
        console.error("Error fetching pins", err);
      }
    }

    fetchPinsData(); // Trigger fetching pins on component mount
  }, []);



  //handle click
  const handleMapClick = (event) => {
    if (!isEditing) {
      const { lngLat } = event;
      setNewTrail({
        latitude: lngLat.lat,
        longitude: lngLat.lng,
        color: "#FF5733",
        difficulty: "Easy",
        length: 0,
        time: 0,
        description: "",
        addedBy,
      });
    }
  };

  //save pin info
  const handleTrailSave = async () => {
    // Format location as "latitude,longitude"
    const formattedLocation = `${newTrail.latitude},${newTrail.longitude}`;

    const pinData = {
      ...newTrail,
      location: formattedLocation,
      addedBy: addedBy,
    };

    try {
      await createPin(pinData);
      // console.log(pinData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen mt-4">
      <Map
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        crossOrigin="anonymous"
        mode="cors"
        onClick={handleMapClick}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <ScaleControl />

        {trails.map((trail) => (
          <Marker
            key={trail.id}
            latitude={trail.latitude}
            longitude={trail.longitude}
            anchor="bottom"
          >
            <MapPin
              onClick={() => setSelectedTrail(trail)}
              className="w-6 h-6 cursor-pointer"
              color={trail.color}
            />
          </Marker>
        ))}
      
      {/* Render all pins as markers */}
      {pins.map((pin) => (
          <Marker
            key={pin._id}
            longitude={pin.location.coordinates[0]}
            latitude={pin.location.coordinates[1]}
            anchor="bottom"
          >
            <div
              style={{
                backgroundColor: pin.color || "#000",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
              }}
            ></div>
          </Marker>
        ))}
        
        {selectedTrail && (
          <Popup
            latitude={selectedTrail.latitude}
            longitude={selectedTrail.longitude}
            onClose={() => setSelectedTrail(null)}
            closeOnClick={false}
          >
            <div className="p-4 max-w-sm">
              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTrailUpdate(selectedTrail);
                  }}
                >
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    value={selectedTrail.description}
                    onChange={(e) =>
                      setSelectedTrail({
                        ...selectedTrail,
                        description: e.target.value,
                      })
                    }
                  />
                  <select
                    className="w-full p-2 mb-2 border rounded"
                    value={selectedTrail.difficulty}
                    onChange={(e) =>
                      setSelectedTrail({
                        ...selectedTrail,
                        difficulty: e.target.value,
                      })
                    }
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                  <input
                    type="number"
                    className="w-full p-2 mb-2 border rounded"
                    value={selectedTrail.length}
                    onChange={(e) =>
                      setSelectedTrail({
                        ...selectedTrail,
                        length: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Length (km)"
                  />
                  <input
                    type="number"
                    className="w-full p-2 mb-2 border rounded"
                    value={selectedTrail.time}
                    onChange={(e) =>
                      setSelectedTrail({
                        ...selectedTrail,
                        time: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Time (hours)"
                  />
                  <HexColorPicker
                    color={selectedTrail.color}
                    onChange={(color) =>
                      setSelectedTrail({ ...selectedTrail, color })
                    }
                  />
                  <button
                    type="submit"
                    className="w-full p-2 mt-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="font-bold mb-2">
                    {selectedTrail.description}
                  </h3>
                  <p>Difficulty: {selectedTrail.difficulty}</p>
                  <p>Length: {selectedTrail.length}km</p>
                  <p>Estimated Time: {selectedTrail.time}h</p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 bg-yellow-500 text-white rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleTrailDelete(selectedTrail.id)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </Popup>
        )}
        {newTrail && (
          <Popup
            latitude={newTrail.latitude}
            longitude={newTrail.longitude}
            onClose={() => setNewTrail(null)}
            closeOnClick={false}
          >
            <div className="p-4 max-w-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTrailSave();
                }}
              >
                <input
                  className="w-full p-2 mb-2 border rounded"
                  value={newTrail.description || ""}
                  onChange={(e) =>
                    setNewTrail({ ...newTrail, description: e.target.value })
                  }
                  placeholder="Trail description"
                />
                <select
                  className="w-full p-2 mb-2 border rounded"
                  value={newTrail.difficulty}
                  onChange={(e) =>
                    setNewTrail({ ...newTrail, difficulty: e.target.value })
                  }
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                </select>
                <input
                  type="number"
                  className="w-full p-2 mb-2 border rounded"
                  min={0}
                  value={newTrail.length || ""}
                  onChange={(e) =>
                    setNewTrail({
                      ...newTrail,
                      length: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Length of trail (km)"
                />
                <input
                  type="number"
                  className="w-full p-2 mb-2 border rounded"
                  min={0}
                  value={newTrail.time || ""}
                  onChange={(e) =>
                    setNewTrail({
                      ...newTrail,
                      time: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Time to complete (hours)"
                />
                <HexColorPicker
                  color={newTrail.color}
                  onChange={(color) => setNewTrail({ ...newTrail, color })}
                />

                <button
                  type="submit"
                  className="w-full p-2 mt-2 bg-green-500 text-white rounded"
                >
                  Add Trail
                </button>
                <label>
                  Added By:
                  <input
                    type="text"
                    value={addedBy}
                    onChange={(event) => setAddedBy(event.target.value)}
                    disabled
                  />
                </label>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default MyMap;
