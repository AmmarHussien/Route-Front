import axios from "axios";
import getAuthToken from "../getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/roles";

export async function getAllRole() {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Role failed due to an unexpected error"
    );
  }
}

export async function getRole(id) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Role failed due to an unexpected error"
    );
  }
}

export async function createRole(name, permissions) {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${URL}`,
      {
        name,
        permissions,
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

export async function updateRole(id, name, permissions) {
  try {
    const token = await getAuthToken();

    const response = await axios.put(
      `${URL}/${id}`,
      {
        name,
        permissions,
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

export async function deleteRole(id) {
  try {
    const token = await getAuthToken();

    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Delete Roles failed due to an unexpected error"
    );
  }
}
