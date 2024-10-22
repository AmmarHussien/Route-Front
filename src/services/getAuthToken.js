export default function getAuthToken() {
  return new Promise((resolve) => {
    const token = localStorage.getItem("authToken");
    resolve(token);
  });
}
