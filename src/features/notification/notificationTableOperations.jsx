import Filter from "../../ui/Filter";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function NotificationTableOperations({ searchTerm, setSearchTerm }) {
  return (
    <>
      <TableOperations>
        <Filter
          filterField="is_sent"
          options={[
            { value: "1", label: "Sent" },
            { value: "0", label: "Scheduled" },
          ]}
        />
        <Filter
          filterField="app_type"
          options={[
            { value: "All", label: "All" },
            { value: "Driver", label: "Driver" },
            { value: "User", label: "User" },
          ]}
        />
        <Filter
          filterField="platform"
          options={[
            { value: "All", label: "All" },
            { value: "Android", label: "Android" },
            { value: "Ios", label: "Ios" },
            { value: "Sms", label: "Sms" },
          ]}
        />
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SortBy
          options={[
            {
              value: "date-desc",
              label: "Sort by Date (recent first)",
            },
            {
              value: "date-asc",
              label: "Sort by Date (earlier first)",
            },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default NotificationTableOperations;
