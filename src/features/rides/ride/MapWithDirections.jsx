import { useRef, useState, useCallback, useEffect } from "react";
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
  const directionsRendererRef = useRef(null);
  const directionsServiceRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [response, setResponse] = useState(null);

  const initializeMap = useCallback(() => {
    if (mapRef.current) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current =
        new window.google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(mapRef.current);
    }
  }, []);

  const calculateAndDisplayRoute = useCallback(() => {
    if (directionsServiceRef.current && directionsRendererRef.current) {
      const waypts = locations.map((location) => ({
        location: new window.google.maps.LatLng(
          location.location.lat,
          location.location.lng
        ),
        stopover: true,
      }));

      directionsServiceRef.current.route(
        {
          origin: new window.google.maps.LatLng(
            locations[0].location.lat,
            locations[0].location.lng
          ),
          destination: new window.google.maps.LatLng(
            locations[1].location.lat,
            locations[1].location.lng
          ),
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            directionsRendererRef.current.setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    // Use a timeout to allow mapRef to be set properly
    const timer = setTimeout(() => {
      initializeMap();
      if (mapRef.current) {
        calculateAndDisplayRoute();
      }
    }, 500); // Adjust timing if necessary

    // Cleanup timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [initializeMap, calculateAndDisplayRoute]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <LoadScript
        googleMapsApiKey="AIzaSyDRjZmZOxz5nP-ZIrZZqs1NJlQ2-XeH3R8" // Replace with your actual API key
        libraries={["places", "geometry"]}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
            initializeMap();
          }}
        />
      </LoadScript>
    </div>
  );
};

export default MapWithDirections;
