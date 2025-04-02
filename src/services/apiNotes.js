import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function addNewNotes(id, note, type) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.post(
      `${URL}notes/${id}/${type}`,
      {
        description: note,
      },
      {
        headers: {
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Notes failed due to an unexpected error"
    );
  }
}
