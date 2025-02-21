import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Row from "../../../../ui/Row";

export default function RoleCheckboxList({
  roles,
  selectedRoles,
  onSave,
  isEditable,
}) {
  const [checkedRoles, setCheckedRoles] = useState(
    new Set(selectedRoles.map((role) => role.id))
  );

  // ✅ Handle Role Checkbox Change
  const handleRoleChange = (event, roleId) => {
    if (!isEditable) return;

    setCheckedRoles((prevChecked) => {
      const updatedChecked = new Set(prevChecked);
      if (event.target.checked) {
        updatedChecked.add(roleId);
      } else {
        updatedChecked.delete(roleId);
      }
      return updatedChecked;
    });
  };

  // ✅ Only call onSave when roles have changed
  useEffect(() => {
    // Avoid running unnecessarily when the component mounts
    if (onSave && typeof onSave === "function") {
      onSave(Array.from(checkedRoles)); // Send only IDs
    }
  }, [checkedRoles]); // Only runs when `checkedRoles` changes

  return (
    <div>
      <Row type="vertical">
        {roles.map((role) => (
          <Box
            key={role.id}
            sx={{ display: "flex", flexDirection: "column", ml: 3 }}
          >
            <FormControlLabel
              label={role.name}
              control={
                <Checkbox
                  checked={checkedRoles.has(role.id)}
                  disabled={!isEditable}
                  onChange={(event) => handleRoleChange(event, role.id)}
                />
              }
            />
          </Box>
        ))}
      </Row>
    </div>
  );
}
