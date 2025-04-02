import axios from "axios";
import { TokenServices } from "../utils/TokenService";

const URL = "https://route-service.app/dashboard-api/v1/ratings/";

const date = new Date();
const month = date.getMonth() + 1; // getMonth() is zero-based, so add 1
const year = date.getFullYear();

export async function getOverAllRatingUser() {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(`${URL}all?type=User`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
      params: {
        month,
        year,
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Rating failed due to an unexpected error"
    );
  }
}

export async function getOverAllRatingDriver() {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(`${URL}all?type=Driver`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Rating failed due to an unexpected error"
    );
  }
}

export async function getTotalRatings(type, year, month) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(
      `${URL}${type}`,

      {
        headers: {
          ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
          // Add any other headers if needed
        },
        params: {
          month,
          year,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Total Ratings failed due to an unexpected error"
    );
  }
}

export async function getRatingsReview(year, month) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(
      `${URL}reviews`,

      {
        headers: {
          ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
          // Add any other headers if needed
        },
        params: {
          month,
          year,
        },
      }
    );

    if (response.data && response.data.data && response.data.data.reviews) {
      // Remove % sign from the percentage field
      const updatedResponse = {
        ...response,
        data: {
          ...response.data,
          data: {
            ...response.data.data,
            reviews: response.data.data.reviews.map((review) => ({
              ...review,
              //percentage: parseInt(review.percentage.replace("%", ""), 10), // Remove % sign and convert to integer
              percentage: parseFloat(review.percentage.replace("%", "")), // Remove % sign and convert to float
            })),
          },
        },
      };

      return updatedResponse.data.data; // Return the nested data object
    } else {
      throw new Error("Invalid response data format");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Ratings Review failed due to an unexpected error"
    );
  }
}

export async function getTotalReviewDriver(year, month) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(
      `${URL}all?type=Driver`,

      {
        headers: {
          ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
          // Add any other headers if needed
        },
        params: {
          month,
          year,
        },
      }
    );
    return response.data.data; // Return the response
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Total Review failed due to an unexpected error"
    );
  }
}

export async function getTotalReviewUser(year, month) {
  try {
    const token = TokenServices.getToken();

    const response = await axios.get(
      `${URL}all?type=User`,

      {
        headers: {
          ApiToken: `Bearer ${token}`, // Sending the token in the Authorization header
          // Add any other headers if needed
        },
        params: {
          month,
          year,
        },
      }
    );
    return response.data.data; // Return the response
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Total Review failed due to an unexpected error"
    );
  }
}
