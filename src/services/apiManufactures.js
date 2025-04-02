import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/api/manufactures";

export async function getAllManufactures(isRTL) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(`${URL}`, {
      headers: {
        ApiToken: `Bearer ${token}`,
        "Accept-Language": isRTL ? "ar" : "en", // Use quotes for header namesAuthorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Manufactures failed due to an unexpected error"
    );
  }
}
