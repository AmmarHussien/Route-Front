import axios from "axios";
import { TokenServices } from "../../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/admins";

export async function getAllAdmins() {
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
        "Fetching Admins failed due to an unexpected error"
    );
  }
}

export async function getAdmin(id) {
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
        "Fetching Admin failed due to an unexpected error"
    );
  }
}

export async function CreateAdmin(FormData) {
  try {
    const token = TokenServices.getToken();

    // ✅ Log the FormData
    console.log("Logging FormData: from api");

    for (let pair of FormData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await axios.post(
      `${URL}`,

      FormData,

      {
        headers: {
          Accept: "application/json",
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Admin failed due to an unexpected error"
    );
  }
}

export async function updateAdmin(
  id,
  first_name,
  last_name,
  email,
  status,
  roles
) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.put(
      `${URL}/${id}`,
      {
        first_name,
        last_name,
        email,
        status,
        roles,
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
