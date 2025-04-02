// Description: This module provides functions to manage permission in session storage.
export const PermissionServices = {
  getPermission: () => JSON.parse(sessionStorage.getItem("permission")),
  setPermission: (permissions) =>
    sessionStorage.setItem("permission", permissions),
  removePermission: () => sessionStorage.removeItem("permission"),
};
