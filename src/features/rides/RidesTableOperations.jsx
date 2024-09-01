import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function RidesTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "All-Ride", label: "All Ride" },
          { value: "Scheduled", label: "Scheduled" },
          { value: "Cancelled", label: "Cancelled" },
        ]}
      />
    </TableOperations>
  );
}

export default RidesTableOperations;
