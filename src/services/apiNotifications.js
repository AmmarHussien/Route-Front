import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/notifications";

export async function createNewNotification(formData) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.post(`${URL}`, formData, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching notifications failed due to an unexpected error"
    );
  }
}

export async function getAllNotification({
  resultSent,
  resultType,
  searchTerm,
  resultPlatform,
  page,
  sortBy,
  sortType,
  perPage,
  isRTL,
}) {
  try {
    const token = TokenServices.getToken();

    // Prepare query parameters
    const params = {
      select: "*",
      count: "exact",
    };

    // Add filter parameters if provided
    if (resultSent) {
      params[resultSent.field] = resultSent.value;
    }
    if (resultType) {
      params[resultType.field] = resultType.value;
    }
    if (resultPlatform) {
      params[resultPlatform.field] = resultPlatform.value;
    }

    /// sort by
    if (sortBy) {
      params.sort_by = sortBy;
      params.sort_type = sortType; // Assuming your API uses `sortType` for sorting order
    }
    // Add pagination parameters if provided
    if (page) {
      params.page = page;
      params.per_page = perPage; // Assuming your API uses pageSize for pagination
    }

    // Make the API request
    const response = await axios.get(`${URL}?search_key=${searchTerm}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
      params, // Pass the prepared query parameters
    });

    const data = response.data.data || [];
    const count = response.data.meta.total; // Count the exact number of objects

    return { data, error: null, count };
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching notifications failed due to an unexpected error"
    );
  }
}
