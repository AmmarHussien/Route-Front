import axios from "axios";
import { TokenServices } from "../../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/manufactures";

export async function getAllManufactures(isRTL) {
  try {
    const token = TokenServices.getToken();

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
  try {
    const token = TokenServices.getToken();

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
  try {
    const token = TokenServices.getToken();

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
  try {
    const token = TokenServices.getToken();

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
  try {
    const token = TokenServices.getToken();

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
