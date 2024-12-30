import axios from "axios";
import getAuthToken from "./getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function logout() {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${URL}logout`,
      {},
      {
        headers: {
          ApiToken: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "logout failed due to an unexpected error"
    );
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${URL}login`, {
      email: email,
      password: password,
    });

    if (response && response.data) {
      // Assuming the response contains a token
      const { access_token } = response.data.data;

      localStorage.setItem("authToken", access_token);

      // Redirect or update UI as needed

      console.log(response.data.data);

      return response.data.data;
    } else {
      throw new Error("Login failed: No response data");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed due to an unexpected error"
    );
  }
}

export async function getCurrentUser() {
  const { data: session } = localStorage.getItem("authToken");

  if (!session.session) return null;

  const { data, error } = localStorage.getItem("authToken");

  if (error) throw new Error(error.message);

  return data?.user;
}
