import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Spinner from "../../../ui/Spinner";

// Move libraries array outside of the component to prevent re-creation
const libraries = ["places", "geometry"];

const MapWithDirections = ({ location }) => {
  // Validate and provide default values for location
  const safeLocation = (loc) => {
    if (!loc || loc.length < 4) return [0, 0, 0, 0];
    return loc;
  };

  const validatedLocation = useMemo(() => safeLocation(location), [location]);

  const locations = useMemo(
    () => [
      {
        location: { lat: validatedLocation[0], lng: validatedLocation[1] },
      },
      {
        location: { lat: validatedLocation[2], lng: validatedLocation[3] },
      },
    ],
    [validatedLocation]
  );

  // Ensure center has valid lat/lng values
  const center = useMemo(() => {
    if (!Array.isArray(locations) || locations.length < 2) {
      console.error("Invalid locations array:", locations);
      return { lat: 0, lng: 0 }; // Default center
    }

    const getValidCoord = (coord) =>
      typeof coord === "number" && !isNaN(coord) ? coord : 0;

    const lat1 = getValidCoord(locations[0]?.location?.lat);
    const lng1 = getValidCoord(locations[0]?.location?.lng);
    const lat2 = getValidCoord(locations[1]?.location?.lat);
    const lng2 = getValidCoord(locations[1]?.location?.lng);

    // if (lat1 === 0 && lng1 === 0 && lat2 === 0 && lng2 === 0) {
    //   console.warn("All coordinates are defaulting to (0,0)");
    // }

    return {
      lat: (lat1 + lat2) / 2,
      lng: (lng1 + lng2) / 2,
    };
  }, [locations]);

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
      const wayPoint = locations.map((location) => ({
        location: new window.google.maps.LatLng(
          location.location.lat,
          location.location.lng
        ),
        stopover: true,
      }));

      const cachedResponse = localStorage.getItem("mapResponse");
      if (cachedResponse) {
        setResponse(JSON.parse(cachedResponse));
        directionsRendererRef.current.setDirections(JSON.parse(cachedResponse));
        return;
      }

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
          waypoints: wayPoint,
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
  }, [locations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeMap();
      if (mapRef.current) {
        calculateAndDisplayRoute();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [initializeMap, calculateAndDisplayRoute]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDRjZmZOxz5nP-ZIrZZqs1NJlQ2-XeH3R8", // Replace with your actual API key
    libraries, // Pass the constant `libraries` variable
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={center}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
          initializeMap();
        }}
        options={{
          disableDefaultUI: true, // Disable all default UI controls like zoom buttons
          draggable: false, // Prevent map dragging
          zoomControl: false, // Disable zooming via buttons
          scrollwheel: false, // Disable zooming via scroll
          disableDoubleClickZoom: true, // Disable zooming on double click
          gestureHandling: "none", // Disable zooming and panning via gestures
        }}
      />
    </div>
  );
};

export default MapWithDirections;
