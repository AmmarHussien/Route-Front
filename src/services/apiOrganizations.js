import axios from "axios";
import getAuthToken from "./getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/organizations";
const URLS = "https://route-service.app/api/organizations";

export async function getAllOrganizations() {
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
        "Fetching Organizations failed due to an unexpected error"
    );
  }
}

export async function getAllOrganization() {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URLS}`, {
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

// export async function getOrganization(id) {
//   try {
//     const response = await axios.get(`${URL}/${id}`, {
//       headers: {
//         ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
//       },
//     });

//     return response.data.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         "Fetching Organization failed due to an unexpected error"
//     );
//   }
// }
