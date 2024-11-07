import axios from "axios";
import getAuthToken from "./getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function getAllUsers({
  filter,
  page,
  searchKey,
  sortBy,
  sortType,
  perPage,
}) {
  try {
    const token = await getAuthToken();

    // Prepare query parameters
    const params = {
      select: "*",
    };

    // Add filter parameters if provided
    if (filter) {
      params[filter.field] = filter.value;
    }

    //sort

    // Add sorting parameters if provided
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
    const response = await axios.get(`${URL}users?search_key=${searchKey}`, {
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
        "Fetching Users failed due to an unexpected error"
    );
  }
}

export async function getUser(id, isRTL) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}users/${id}`, {
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
        "Fetching User failed due to an unexpected error"
    );
  }
}

export async function addNewUser(formData, isRTL) {
  try {
    const token = await getAuthToken();

    const response = await axios.post(`${URL}users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
        "Accept-Language": isRTL ? "ar" : "en",
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Users failed due to an unexpected error"
    );
  }
}

export async function editUser(id, formData, isRTL) {
  try {
    const token = await getAuthToken();

    const response = await axios.put(`${URL}users/${id}`, formData, {
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
        "Fetching User failed due to an unexpected error"
    );
  }
}

export async function updateUserStatus(id, reason, status, isRTL) {
  try {
    const token = await getAuthToken();

    const response = await axios.put(
      `${URL}users/${id}/status/update`,
      {
        status: status,
        blocked_reason: reason,
      },
      {
        headers: {
          ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
          "Accept-Language": isRTL ? "ar" : "en",
        },
        // Pass the prepared query parameters
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching User failed due to an unexpected error"
    );
  }
}
