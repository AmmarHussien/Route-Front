import axios from "axios";
import { TokenServices } from "../../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/permissions";

export async function getAllPermissions() {
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
        "Fetching Permissions failed due to an unexpected error"
    );
  }
}
