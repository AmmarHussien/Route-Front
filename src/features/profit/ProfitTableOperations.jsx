import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ProfitTableOperations({ searchTerm, setSearchTerm }) {
  return (
    <>
      <TableOperations>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SortBy
          options={[
            {
              value: "id-desc",
              label: "New ID",
            },
            {
              value: "id-asc",
              label: "Old ID",
            },
            {
              value: "created_at-desc",
              label: "New Date",
            },
            {
              value: "created_at-asc",
              label: "Old Date ",
            },
            {
              value: "total-desc",
              label: "Total (High to Low)",
            },
            {
              value: "total-asc",
              label: "Total (Low to High)",
            },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default ProfitTableOperations;
