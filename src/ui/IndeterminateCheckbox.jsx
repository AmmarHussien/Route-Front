import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Row from "./Row";

export default function IndeterminateCheckbox({
  data,
  permissions,
  showOnlyChecked,
}) {
  // Extract preselected permission IDs
  const preselectedIds = React.useMemo(
    () => permissions?.map((perm) => perm.id) || [],
    [permissions]
  );

  // ✅ State for managing checkboxes
  const [groups, setGroups] = React.useState([]);

  // ✅ Ensure data is fully loaded before updating state
  React.useEffect(() => {
    if (!data || Object.keys(data).length === 0) return; // Prevent setting state if data is empty

    setGroups(
      Object.entries(data).map(([category, items]) => ({
        category,
        parentChecked:
          Array.isArray(items) &&
          items.some((child) => preselectedIds.includes(child.id)),
        children: Array.isArray(items)
          ? items.map((child) => ({
              id: child.id,
              name: child.name,
              checked: preselectedIds.includes(child.id),
              disabled: !preselectedIds.includes(child.id),
            }))
          : [],
      }))
    );
  }, [data, permissions, preselectedIds]); // 🔹 Use JSON.stringify() to detect deep changes

  // ✅ Handle Parent Checkbox Change (Toggle All Children)
  const handleParentChange = (event, parentIndex) => {
    const isChecked = event.target.checked;
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === parentIndex
          ? {
              ...group,
              parentChecked: isChecked,
              children: group.children.map((child) => ({
                ...child,
                checked: child.disabled ? child.checked : isChecked, // Only change enabled checkboxes
              })),
            }
          : group
      )
    );
  };

  // ✅ Handle Child Checkbox Change
  const handleChildChange = (event, parentIndex, childIndex) => {
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === parentIndex
          ? {
              ...group,
              children: group.children.map((child, j) =>
                j === childIndex && !child.disabled
                  ? { ...child, checked: event.target.checked }
                  : child
              ),
              parentChecked: group.children.some((child) => child.checked),
            }
          : group
      )
    );
  };

  // ✅ Filter dynamically when `showOnlyChecked` is toggled
  const filteredGroups = showOnlyChecked
    ? groups
        .map((group) => ({
          ...group,
          children: group.children.filter((child) => child.checked), // Keep only checked children
        }))
        .filter((group) => group.children.length > 0) // Hide parents with no checked children
    : groups;

  // ✅ Show loading state if `data` is still empty
  if (!data || Object.keys(data).length === 0) {
    return <p>Loading checkboxes...</p>;
  }

  return (
    <div>
      {filteredGroups.map((group, parentIndex) => (
        <Row key={group.category}>
          {/* Parent Checkbox */}
          <FormControlLabel
            label={group.category}
            control={
              <Checkbox
                checked={group.children.every((child) => child.checked)}
                indeterminate={
                  group.children.some((child) => child.checked) &&
                  !group.children.every((child) => child.checked)
                }
                onChange={(event) => handleParentChange(event, parentIndex)}
              />
            }
          />

          {/* Show only checked children */}
          <Row type="horizontal">
            {group.children.map((child, childIndex) => (
              <Box
                key={child.id}
                sx={{ display: "flex", flexDirection: "column", ml: 3 }}
              >
                <FormControlLabel
                  label={child.name}
                  control={
                    <Checkbox
                      checked={child.checked}
                      disabled={child.disabled}
                      onChange={(event) =>
                        handleChildChange(event, parentIndex, childIndex)
                      }
                    />
                  }
                />
              </Box>
            ))}
          </Row>
        </Row>
      ))}
    </div>
  );
}
