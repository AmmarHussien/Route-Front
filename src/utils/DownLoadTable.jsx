import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton } from "@mui/material";

const DownloadTable = ({ tableData, title }) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);

    // Create the Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Trigger download
    saveAs(data, `${title}.xlsx`);
  };

  return (
    //  onClick={handleDownload}>
    <IconButton onClick={handleDownload} edge="end">
      <FileDownloadIcon sx={{ width: 24, height: 24 }} />
    </IconButton>
  );
};

export default DownloadTable;
