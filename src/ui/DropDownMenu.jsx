import { useEffect, useRef, useState } from "react";

function DropDownMenu({ options, title, onSelect, disabled, selectedOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleIconClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    if (!disabled) {
      setIsOpen(false);
      if (onSelect) {
        onSelect(option.id); // Notify the parent component
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ ...styles.container, ...(disabled && styles.disabled) }}
      ref={dropdownRef}
    >
      <label style={styles.label}>
        {selectedOption ? selectedOption.name || selectedOption.model : title}
      </label>
      <span style={styles.icon} onClick={handleIconClick}>
        {isOpen ? "▲" : "▼"}
      </span>
      {isOpen && !disabled && (
        <ul style={styles.options}>
          {Array.isArray(options) &&
            options.map((option) => (
              <li
                key={option.id}
                style={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                {option.name || option.model}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "327px",
    boxSizing: "border-box",
    cursor: "pointer",
    height: "56px",
    padding: "8px 16px",
    gap: "16px",
    borderRadius: "16px",
    border: "1px solid var(--color-grey-300)",
    backgroundColor: "#f7f8fa",
  },
  disabled: {
    cursor: "not-allowed",
    backgroundColor: "#e0e0e0",
  },
  label: {
    color: "#666",
    fontSize: "16px",
  },
  icon: {
    fontSize: "12px",
  },
  options: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "5px",
    zIndex: 1000,
    listStyleType: "none",
    padding: 0,
    margin: 0,
    maxHeight: "200px",
    overflowY: "auto",
  },
  option: {
    padding: "10px",
    cursor: "pointer",
  },
};

export default DropDownMenu;
