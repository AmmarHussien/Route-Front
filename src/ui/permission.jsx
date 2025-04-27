import PropTypes from "prop-types";
import usePermissions from "../hooks/usePermissions";

const Permission = ({ children, requiredPermissions, fallback = null }) => {
  const { hasPermission } = usePermissions();

  // Ensure requiredPermissions is an array
  const permissionsToCheck = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  // Check if the user has at least one of the required permissions
  const hasAccess = permissionsToCheck.some((permission) => {
    const result = hasPermission(permission);
    //console.log(`Permission check for "${permission}":`, result);
    return result;
  });

  // If the user has access, render the children
  if (hasAccess) {
    return <>{children}</>;
  }

  // Otherwise, render the fallback UI
  return fallback;
};

Permission.propTypes = {
  children: PropTypes.node.isRequired,
  requiredPermissions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  fallback: PropTypes.node,
};

export default Permission;
