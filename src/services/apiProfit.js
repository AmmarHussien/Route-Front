import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/profits";

const date = new Date();
const month = date.getMonth() + 1; // getMonth() is zero-based, so add 1
const year = date.getFullYear();
const lastMonth = date.getMonth();

export async function getProfitStatisticCurrentMonth() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    const response = await axios.get(`${URL}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
        // Add any other headers if needed
      },
      params: {
        month,
        year,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Profit Statistic failed due to an unexpected error"
    );
  }
}

export async function getProfitStatisticLastMonth() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    const response = await axios.get(`${URL}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
        // Add any other headers if needed
      },
      params: {
        month: lastMonth,
        year,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Profit Statistic failed due to an unexpected error"
    );
  }
}

export async function getProfits() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    const response = await axios.get(`${URL}/admin`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
        // Add any other headers if needed
      },
    });

    const data = response.data.data || [];
    const count = response.data.meta.total; // Count the exact number of objects

    return { data, error: null, count };
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Profit Statistic failed due to an unexpected error"
    );
  }
}

export async function getAdminProfit({
  filter,
  page,
  sortBy,
  sortType,
  perPage,
}) {
  const token = localStorage.getItem("authToken");
  try {
    // Prepare query parameters
    const params = {
      select: "*",
    };

    // Add filter parameters if provided
    // if (filter) {
    //   params[filter.field] = filter.value;
    // }

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
    const response = await axios.get(`${URL}/admin`, {
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
        "Admin Profit failed due to an unexpected error"
    );
  }
}

export async function getAdminProfitSearch({
  filter,
  page,
  searchKey,
  sortBy,
  sortType,
  perPage,
}) {
  const token = localStorage.getItem("authToken");
  try {
    // Prepare query parameters
    const params = {
      select: "*",
      count: "exact",
    };

    // Add filter parameters if provided
    // if (filter) {
    //   params[filter.field] = filter.value;
    // }
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
    const response = await axios.get(`${URL}/admin?search_key=${searchKey}`, {
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
        "Fetching Admin Profit Search failed due to an unexpected error"
    );
  }
}

export async function getDriverProfit({
  filter,
  page,
  sortBy,
  sortType,
  perPage,
}) {
  const token = localStorage.getItem("authToken");
  try {
    // Prepare query parameters
    const params = {
      select: "*",
    };

    // Add filter parameters if provided
    // if (filter) {
    //   params[filter.field] = filter.value;
    // }

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
    const response = await axios.get(`${URL}/drivers`, {
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
        "Admin Profit failed due to an unexpected error"
    );
  }
}

export async function getDriverProfitSearch({
  filter,
  page,
  searchKey,
  sortBy,
  sortType,
  perPage,
}) {
  const token = localStorage.getItem("authToken");
  try {
    // Prepare query parameters
    const params = {
      select: "*",
      count: "exact",
    };

    // Add filter parameters if provided
    // if (filter) {
    //   params[filter.field] = filter.value;
    // }
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
    const response = await axios.get(`${URL}/drivers?search_key=${searchKey}`, {
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
        "Fetching Admin Profit Search failed due to an unexpected error"
    );
  }
}
