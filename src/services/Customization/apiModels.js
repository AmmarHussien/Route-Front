import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/manufactures/";
const token = localStorage.getItem("authToken");

export async function getAllModels(brandId) {
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

export async function updateModel(
  brandId,
  modelId,
  englishName,
  arabicName,
  isActive
) {
  try {
    const response = await axios.put(
      `${URL}${brandId}/models/${modelId}`,
      {
        name: {
          en: englishName,
          ar: arabicName,
        },
        is_active: isActive,
      },
      {
        headers: {
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Update Manufactures failed due to an unexpected error"
    );
  }
}

export async function createModels(brandId, englishName, arabicName) {
  try {
    const response = await axios.post(
      `${URL}${brandId}/models`,
      {
        name: {
          en: englishName,
          ar: arabicName,
        },
      },
      {
        headers: {
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Create Model failed due to an unexpected error"
    );
  }
}

export async function deleteModel(brandId, modelId) {
  try {
    const response = await axios.delete(
      `${URL}${brandId}/models/${modelId}`,

      {
        headers: {
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Update Manufactures failed due to an unexpected error"
    );
  }
}
