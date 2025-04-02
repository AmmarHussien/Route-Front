import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function getAllRides({
  filter,
  page,
  searchKey,
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
    if (filter) {
      params[filter.field] = filter.value;
    }

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
    const response = await axios.get(`${URL}rides?search_key=${searchKey}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        "Accept-Language": isRTL ? "ar" : "en",
      },
      params, // Pass the prepared query parameters
    });

    const data = response.data.data || [];
    const count = response.data.meta.total; // Count the exact number of objects

    return { data, error: null, count };
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Rides failed due to an unexpected error"
    );
  }
}

export async function getRide(id, isRTL) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(`${URL}rides/${id}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        "Accept-Language": isRTL ? "ar" : "en",
      },
      // Pass the prepared query parameters
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Rides failed due to an unexpected error"
    );
  }
}
