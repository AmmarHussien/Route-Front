import Filter from "../../ui/Filter";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function RidesTableOperations({ searchTerm, setSearchTerm }) {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          // { value: "All-Ride", label: "All Ride" },
          { value: "Completed", label: "Completed" },
          { value: "Cancelled", label: "Cancelled" },
          { value: "Scheduled", label: "Scheduled" },
        ]}
      />

      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <SortBy
        options={[
          {
            value: "id-desc",
            label: "Sort by ID (recent first)",
          },
          {
            value: "id-asc",
            label: "Sort by ID (earlier first)",
          },
          // {
          //   value: "driver-asc",
          //   label: "Sort Drivers A-Z",
          // },
          // {
          //   value: "driver-desc",
          //   label: "Sort Drivers Z-A",
          // },
          // {
          //   value: "user-asc",
          //   label: "Sort Users A-Z",
          // },
          // {
          //   value: "user-desc",
          //   label: "Sort Users Z-A",
          // },
        ]}
      />
    </TableOperations>
  );
}

export default RidesTableOperations;
