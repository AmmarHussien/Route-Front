import { useEffect, useState, useMemo } from "react";

const usePermissions = () => {
  const [storedPermissions, setStoredPermissions] = useState([]);

  const permissions = useMemo(
    () => ({
      ///// Dashboard
      dashboard: "Access Dashboard",

      ///// Users
      users: "Access Users",
      viewUser: "View Users",
      createUser: "Create Users",
      editUser: "Edit Users",
      editUserStatus: "Change Users Status",

      ///// Driver
      drivers: "Access Drivers",
      viewDriver: "View Drivers",
      createDriver: "Create Drivers",
      editDriver: "Edit Drivers",
      editDriverStatus: "Change Drivers Status",

      ///// Rides
      rides: "Access Rides",
      viewRide: "Access Rides",
      scheduleRides: "Schedule Rides",

      ///// Notes
      createNotes: "Create Notes",

      ///// Organizations
      organizations: "Access Organizations",
      viewOrganization: "View Organizations",
      createOrganization: "Create Organizations",
      editOrganization: "Edit Organizations",
      deleteOrganization: "Delete Organizations",

      ///// Services
      services: "Access Services",
      viewService: "View Services",
      createService: "Create Services",
      editService: "Edit Services",
      deleteService: "Delete Services",

      ///// Services - Cars
      carTypes: "Access CarTypes",
      viewCarType: "View CarTypes",
      createCarType: "Create CarTypes",
      editCarType: "Edit CarTypes",
      deleteCarType: "Delete CarTypes",

      ///// Brand
      manufactures: "Access Manufactures",
      viewManufactures: "View Manufactures",
      createManufactures: "Create Manufactures",
      editManufactures: "Edit Manufactures",
      deleteManufactures: "Delete Manufactures",

      ///// Model
      models: "Access Models",
      viewModel: "View Models",
      createModel: "Create Models",
      editModel: "Edit Models",
      deleteModel: "Delete Models",

      ///// Notifications
      notification: "Access Notifications",
      createNotification: "Create Notifications",

      ///// Admin
      admins: "Access Admins",
      viewAdmin: "View Admins",
      createAdmin: "Create Admins",
      editAdmin: "Edit Admins",

      ///// Role
      roles: "Access Roles",
      viewRole: "View Roles",
      createRole: "Create Roles",
      editRole: "Edit Roles",
      deleteRole: "Delete Roles",

      ///// Ratings
      rating: "View Ratings",

      ///// Profit
      profit: "Access Profit",
    }),
    []
  );

  useEffect(() => {
    try {
      const permissions = JSON.parse(localStorage.getItem("permissions")) || [];
      // console.log("Permissions loaded from localStorage:", permissions);
      setStoredPermissions(Array.isArray(permissions) ? permissions : []);
    } catch (error) {
      console.error("Failed to parse permissions from localStorage:", error);
      setStoredPermissions([]);
    }
  }, []);

  const hasPermission = (key) => {
    if (Array.isArray(key)) {
      return key.some((k) => {
        if (!permissions[k]) {
          console.warn(`Permission key "${k}" is not defined.`);
          return false;
        }
        return (
          Array.isArray(storedPermissions) &&
          storedPermissions.some(
            (permission) => permission.name === permissions[k]
          )
        );
      });
    }

    if (!permissions[key]) {
      console.warn(`Permission key "${key}" is not defined.`);
      return false;
    }

    return (
      Array.isArray(storedPermissions) &&
      storedPermissions.some(
        (permission) => permission.name === permissions[key]
      )
    );
  };

  return { hasPermission };
};

export default usePermissions;
