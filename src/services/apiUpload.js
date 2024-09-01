import axios from "axios";

const URL = "https://route-service.app/api/";

export async function upload(formData) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(`${URL}upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching driver failed due to an unexpected error"
    );
  }
}
