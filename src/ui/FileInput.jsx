import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "327px",
    height: "56px",
    padding: "8px 16px 8px 16px",
    gap: "16px",
    borderRadius: "16px",
    border: "1px solid var(--color-grey-300)",
    opacity: "0px",
    backgroundColor: "#f7f8fa",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  label: {
    flexGrow: 1, // Ensure the label takes up the remaining space
    color: "#666",
    fontSize: "16px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  fileInput: {
    display: "none",
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
  },
};

function FileInput({ placeholder, id, onFileChange, defaultValue }) {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file)); // Create a URL for the new file

      if (onFileChange) {
        onFileChange(file); // Pass the file object to the parent component
      }
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setFileName(defaultValue);
      setFileUrl(defaultValue); // Set the default file URL
    }
  }, [defaultValue]);

  const handleDelete = () => {
    setFileName("");
    setFileUrl(null); // Reset the file URL

    if (onFileChange) {
      onFileChange(null); // Pass null to the parent component to indicate file removal
    }

    const fileInput = document.getElementById(id);
    if (fileInput) {
      fileInput.value = null; // Reset the file input
    } else {
      //console.warn(`Element with id ${id} not found.`);
    }
  };

  return (
    <div style={styles.container}>
      <label htmlFor={id} style={styles.label}>
        {fileName || placeholder || id}
      </label>
      <input
        type="file"
        id={id}
        accept=".webp, .jpeg, .png, .jpg, .pdf, .doc, .docx, .mp4"
        style={styles.fileInput}
        onChange={handleFileChange}
      />
      {fileName ? (
        <>
          <span style={styles.icon} onClick={handleDelete}>
            ✖
          </span>
          {fileUrl ? (
            <span style={styles.icon}>
              <Link to={fileUrl} target="_blank">
                <VisibilityIcon />
              </Link>
            </span>
          ) : null}
        </>
      ) : (
        <span
          style={styles.icon}
          onClick={() => document.getElementById(id).click()}
        >
          🔗
        </span>
      )}
    </div>
  );
}

export default FileInput;
