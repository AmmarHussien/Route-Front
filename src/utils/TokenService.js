// Description: This module provides functions to manage authentication tokens in session storage.
export const TokenServices = {
  getToken: () => sessionStorage.getItem("authToken"),
  setToken: (token) => sessionStorage.setItem("authToken", token),
  removeToken: () => sessionStorage.removeItem("authToken"),
};
