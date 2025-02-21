import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Row from "./Row";

export default function IndeterminateCheckboxWithEdit({
  data,
  permissions,
  onSave,
  isEditable,
}) {
  const preselectedIds = React.useMemo(
    () => permissions?.map((perm) => perm.id) || [],
    [permissions]
  );

  const [groups, setGroups] = useState([]);
  const [checkedIds, setCheckedIds] = useState(new Set(preselectedIds));
  const prevCheckedIds = useRef(new Set(preselectedIds)); // ✅ Store previous state

  // ✅ Initialize checkboxes when data changes
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    setGroups(
      Object.entries(data).map(([category, items]) => ({
        category,
        parentChecked:
          Array.isArray(items) &&
          items.every((child) => checkedIds.has(child.id)),
        children: Array.isArray(items)
          ? items.map((child) => ({
              id: child.id,
              name: child.name,
              checked: checkedIds.has(child.id),
            }))
          : [],
      }))
    );
  }, [data]);

  // ✅ Prevent Infinite Loop by Only Updating on Actual Changes
  useEffect(() => {
    if (isEditable && checkedIds !== prevCheckedIds.current) {
      prevCheckedIds.current = checkedIds; // ✅ Only update if changed
      onSave(Array.from(checkedIds));
    }
  }, [checkedIds, isEditable, onSave]);

  // ✅ Handle Parent Checkbox Change
  const handleParentChange = (event, parentIndex) => {
    if (!isEditable) return;

    const isChecked = event.target.checked;
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === parentIndex
          ? {
              ...group,
              parentChecked: isChecked,
              children: group.children.map((child) => ({
                ...child,
                checked: isChecked,
              })),
            }
          : group
      )
    );

    setCheckedIds((prev) => {
      const newCheckedIds = new Set(prev);
      groups[parentIndex].children.forEach((child) => {
        if (isChecked) {
          newCheckedIds.add(child.id);
        } else {
          newCheckedIds.delete(child.id);
        }
      });
      return newCheckedIds;
    });
  };

  // ✅ Handle Child Checkbox Change
  const handleChildChange = (event, parentIndex, childIndex) => {
    if (!isEditable) return;

    const isChecked = event.target.checked;
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === parentIndex
          ? {
              ...group,
              children: group.children.map((child, j) =>
                j === childIndex ? { ...child, checked: isChecked } : child
              ),
              parentChecked: group.children.every((child) => child.checked),
            }
          : group
      )
    );

    setCheckedIds((prev) => {
      const newCheckedIds = new Set(prev);
      if (isChecked) {
        newCheckedIds.add(groups[parentIndex].children[childIndex].id);
      } else {
        newCheckedIds.delete(groups[parentIndex].children[childIndex].id);
      }
      return newCheckedIds;
    });
  };

  // ✅ Show only checked items when not in edit mode
  const filteredGroups = isEditable
    ? groups // Show all checkboxes when editing
    : groups
        .map((group) => ({
          ...group,
          children: group.children.filter((child) => child.checked),
        }))
        .filter((group) => group.children.length > 0);

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
                disabled={!isEditable}
              />
            }
          />

          {/* Show all children when editing */}
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
                      disabled={!isEditable}
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
