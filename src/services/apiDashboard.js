import axios from "axios";
import getAuthToken from "./getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function getStatistic(isRTL) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}statistics`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
        "Accept-Language": isRTL ? "ar" : "en",
        // Add any other headers if needed
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle the 401 error - for example, redirect to login
      window.location.href = "/login";
    }
    throw new Error(
      error.response?.data?.message ||
        "Statistics failed due to an unexpected error"
    );
  }
}

export async function getRevenues(year, month) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}revenues/${year}/${month}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
        // Add any other headers if needed
      },
    });

    return response.data.data?.revenues;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Revenues failed due to an unexpected error"
    );
  }
}
