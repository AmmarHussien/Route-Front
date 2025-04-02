import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/car_types";

export async function getAllCarType() {
  try {
    const token = TokenServices.getToken();
    const response = await axios.get(`${URL}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Organizations failed due to an unexpected error"
    );
  }
}
