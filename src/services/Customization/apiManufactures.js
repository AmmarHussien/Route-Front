import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/manufactures";

export async function getAllManufactures(isRTL) {
  const token = localStorage.getItem("authToken");

  try {
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
        "Fetching Manufactures failed due to an unexpected error"
    );
  }
}

export async function getManufacture(id) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Get Manufacture failed due to an unexpected error"
    );
  }
}

export async function createManufacture(englishName, arabicName, logo) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `${URL}`,
      {
        name: {
          en: englishName,
          ar: arabicName,
        },
        logo: logo,
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
        "Create Manufactures failed due to an unexpected error"
    );
  }
}

export async function updateManufacture(id, englishName, arabicName, isActive) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.put(
      `${URL}/${id}`,
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

export async function deleteManufacture(id) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Delete Manufactures failed due to an unexpected error"
    );
  }
}
