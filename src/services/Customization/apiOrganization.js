import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/organizations";
const token = localStorage.getItem("authToken");

export async function getAllOrganizations() {
  try {
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

export async function getOrganization(id) {
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
        "Fetching Organization failed due to an unexpected error"
    );
  }
}

export async function createOrganization(englishName, arabicName) {
  try {
    const response = await axios.post(
      `${URL}`,
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
        "Create Organizations failed due to an unexpected error"
    );
  }
}

export async function updateOrganization(
  id,
  englishName,
  arabicName,
  isActive
) {
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
        "Create Organizations failed due to an unexpected error"
    );
  }
}

export async function deleteOrganization(id) {
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
        "Fetching Organization failed due to an unexpected error"
    );
  }
}
