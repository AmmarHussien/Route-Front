import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyDRjZmZOxz5nP-ZIrZZqs1NJlQ2-XeH3R8Y";

export async function getMapImage() {
  //   const instance = axios.create({
  //     headers: {
  //       "Access-Control-Allow-Origin": "https://maps.googleapis.com",
  //       "Access-Control-Allow-Methods": "POST",
  //       "Access-Control-Allow-Headers": "Content-Type",
  //       "Access-Control-Max-Age": " 86400",
  //     },
  //   });

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/directions/json?origin=30.04444639862079,31.235720269912978&destination=29.965882172507808,31.27017284080446&key=AIzaSyDRjZmZOxz5nP-ZIrZZqs1NJlQ2-XeH3R8",
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );

  const directionsData = response.data.json();
  const encodedPolyline = directionsData.routes[0].overview_polyline.points;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red%7Clabel:A%7C30.04444639862079,31.235720269912978&markers=color:blue%7Clabel:B%7C29.965882172507808,31.27017284080446&path=enc:${encodedPolyline}&key=${GOOGLE_MAPS_API_KEY}`;
  console.log(mapUrl);
  return mapUrl;
  //   try {
  //     const directionsResponse = await axios.get(
  //       `https://maps.googleapis.com/maps/api/directions/json`,
  //       {
  //         params: {
  //           origin: "30.04444639862079,31.235720269912978",
  //           destination: "29.965882172507808,31.27017284080446",
  //           key: GOOGLE_MAPS_API_KEY,
  //         },
  //       }
  //     );
}
