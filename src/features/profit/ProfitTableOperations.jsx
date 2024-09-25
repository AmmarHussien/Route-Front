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

            // {
            //   value: "phone-asc",
            //   label: "Sort Phone Numbers (1-9)",
            // },
            // {
            //   value: "phone-desc",
            //   label: "Sort Phone Numbers (9-1)",
            // },
            // {
            //   value: "email-desc",
            //   label: "Sort by Email (recent first)",
            // },
            // {
            //   value: "email-asc",
            //   label: "Sort by Email (earlier first)",
            // },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default ProfitTableOperations;
