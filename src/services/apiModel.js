import axios from "axios";

const URL = "https://route-service.app/";

export async function getModels(brandId, isRTL) {
  const token = localStorage.getItem("authToken");

  try {
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
