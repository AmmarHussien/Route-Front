import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function addNewNotes(id, note) {
  const token = localStorage.getItem("authToken");

  console.log(note);

  try {
    const response = await axios.post(
      `${URL}notes/${id}/driver`,
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
