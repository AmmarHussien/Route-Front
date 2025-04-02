import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/";

export async function getModels(brandId, isRTL) {
  try {
    const token = TokenServices.getToken();
    const response = await axios.get(
      `${URL}api/manufactures/${brandId}/models`,
      {
        headers: {
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
          "Accept-Language": isRTL ? "ar" : "en", // Use quotes for header
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Manufactures failed due to an unexpected error"
    );
  }
}
