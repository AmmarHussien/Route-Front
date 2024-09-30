import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/manufactures/";

export async function getAllModels(brandId) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`${URL}${brandId}/models`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Models failed due to an unexpected error"
    );
  }
}

export async function getModel(brandId, modelId) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`${URL}${brandId}/models/${modelId}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Get Model failed due to an unexpected error"
    );
  }
}
