import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function getStatistic() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    const response = await axios.get(`${URL}statistics`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
        // Add any other headers if needed
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Statistics failed due to an unexpected error"
    );
  }
}

export async function getRevenues(year, month) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

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
