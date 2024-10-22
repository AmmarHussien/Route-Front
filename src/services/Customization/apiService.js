import axios from "axios";
import getAuthToken from "../getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/services";

export async function getAllServices(isRTL) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        "Accept-Language": isRTL ? "ar" : "en",
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Services failed due to an unexpected error"
    );
  }
}
