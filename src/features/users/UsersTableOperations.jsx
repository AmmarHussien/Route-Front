import Filter from "../../ui/Filter";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function UsersTableOperations({ searchTerm, setSearchTerm }) {
  return (
    <>
      <TableOperations>
        <Filter
          filterField="status"
          options={[
            { value: "Approved", label: "Approved" },

            { value: "Blocked", label: "Blocked" },
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
            {
              value: "first_name-asc",
              label: "Sort Names A-Z",
            },
            {
              value: "first_name-desc",
              label: "Sort Name Z-A",
            },
            {
              value: "phone-asc",
              label: "Sort Phone Numbers (1-9)",
            },
            {
              value: "phone-desc",
              label: "Sort Phone Numbers (9-1)",
            },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default UsersTableOperations;
