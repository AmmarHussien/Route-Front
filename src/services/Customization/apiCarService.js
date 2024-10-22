import axios from "axios";
import getAuthToken from "../getAuthToken";

const URL = "https://route-service.app/dashboard-api/v1/services/";

export async function getAllCars(brandId) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}${brandId}/car_types`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Cars failed due to an unexpected error"
    );
  }
}

export async function getCar(brandId, carId) {
  try {
    const token = await getAuthToken();

    const response = await axios.get(`${URL}${brandId}/car_types/${carId}`, {
      headers: {
        ApiToken: `Bearer ${token}`, // Corrected the header name to Authorization
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Fetching Cars failed due to an unexpected error"
    );
  }
}

export async function editCar(
  brandId,
  carId,
  arabicName,
  englishName,
  driverCommission,
  openingPrice,
  separationKm,
  beforeSeparationPrice,
  afterSeparationPrice,
  inOutSeparationKm
) {
  try {
    const token = await getAuthToken();

    const response = await axios.put(
      `${URL}${brandId}/car_types/${carId}`,
      {
        name: {
          ar: arabicName,
          en: englishName,
        },
        driver_commission: driverCommission,
        opening_price: openingPrice,
        separation_km: separationKm,
        before_separation_price: beforeSeparationPrice,
        after_separation_price: afterSeparationPrice,
        in_out_separation_km: inOutSeparationKm,
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
        "Editing Cars failed due to an unexpected error"
    );
  }
}

export async function deleteCar(brandId, carId) {
  try {
    const token = await getAuthToken();

    const response = await axios.delete(
      `${URL}${brandId}/car_types/${carId}`,

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
        "Update Car Service failed due to an unexpected error"
    );
  }
}

export async function createCar(
  brandId,

  arabicName,
  englishName,
  driverCommission,
  openingPrice,
  separationKm,
  beforeSeparationPrice,
  afterSeparationPrice,
  inOutSeparationKm
) {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${URL}${brandId}/car_types`,
      {
        name: {
          ar: arabicName,
          en: englishName,
        },
        driver_commission: driverCommission,
        opening_price: openingPrice,
        separation_km: separationKm,
        before_separation_price: beforeSeparationPrice,
        after_separation_price: afterSeparationPrice,
        in_out_separation_km: inOutSeparationKm,
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
        "Creating Cars failed due to an unexpected error"
    );
  }
}
