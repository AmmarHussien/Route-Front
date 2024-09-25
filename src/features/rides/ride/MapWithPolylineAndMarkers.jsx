import { useRef, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const locations = [
  {
    key: "botanicGardens",
    location: { lat: 30.04444639862079, lng: 31.235720269912978 },
  },
  {
    key: "museumOfSydney",
    location: { lat: 29.965882172507808, lng: 31.27017284080446 },
  },
];

const center = {
  lat: (locations[0].location.lat + locations[1].location.lat) / 2,
  lng: (locations[0].location.lng + locations[1].location.lng) / 2,
};

const MapWithDirections = () => {
  const mapRef = useRef(null);
  const polylineRef = useRef(null);

  const initializeMap = useCallback(() => {
    if (mapRef.current) {
      const { Marker, Polyline } = window.google.maps;

      if (Marker && Polyline) {
        // Create markers
        const markers = locations.map((location) => {
          return new Marker({
            position: location.location,
            map: mapRef.current,
          });
        });

        // Create polyline
        polylineRef.current = new Polyline({
          path: locations.map((location) => location.location),
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 4,
          map: mapRef.current,
        });

        // Function to animate the polyline
        const animatePolyline = () => {
          const path = polylineRef.current.getPath();
          const totalLength = path.getLength();
          let currentIndex = 0;

          const updatePath = () => {
            if (currentIndex < totalLength) {
              const newPath = path.getArray().slice(0, currentIndex + 1);
              polylineRef.current.setPath(newPath);
              currentIndex++;
              setTimeout(updatePath, 100000); // Adjust timing if needed
            }
          };

          updatePath();
        };

        animatePolyline();

        // Cleanup function to remove markers and polyline
        return () => {
          markers.forEach((marker) => marker.setMap(null));
          polylineRef.current.setMap(null);
        };
      } else {
        console.error("Marker or Polyline not available.");
      }
    } else {
      console.log("Map reference is still null.");
    }
  }, []);

  useEffect(() => {
    // Use a timeout to allow mapRef to be set properly
    const timer = setTimeout(() => {
      initializeMap();
    }, 500); // Adjust timing if necessary

    // Cleanup timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [initializeMap]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <LoadScript
        googleMapsApiKey="AIzaSyDRjZmZOxz5nP-ZIrZZqs1NJlQ2-XeH3R8" // Replace with your actual API key
        libraries={["geometry"]}
        onLoad={() => console.log("Google Maps API has loaded.")}
        onError={(error) =>
          console.error("Error loading Google Maps API:", error)
        }
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={12}
          onLoad={(map) => {
            console.log("Map loaded");
            mapRef.current = map;
            console.log("MapRef current set to:", mapRef.current);
          }}
        />
      </LoadScript>
    </div>
  );
};

export default MapWithDirections;
