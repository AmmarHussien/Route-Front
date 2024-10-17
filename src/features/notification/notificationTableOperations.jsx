import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function NotificationTableOperations({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();

  return (
    <>
      <TableOperations>
        <Filter
          filterField="is_sent"
          options={[
            { value: "1", label: t("Sent") },
            { value: "0", label: t("ScheduledNotification") },
          ]}
        />
        <Filter
          filterField="app_type"
          options={[
            { value: "All", label: t("All") },
            { value: "Driver", label: t("Drivers") },
            { value: "User", label: t("Users") },
          ]}
        />
        <Filter
          filterField="platform"
          options={[
            { value: "All", label: t("All") },
            { value: "Android", label: t("Android") },
            { value: "Ios", label: t("IOS") },
            { value: "Sms", label: t("SMS") },
          ]}
        />
        <SortBy
          options={[
            {
              value: "date-desc",
              label: t("date-desc"),
            },
            {
              value: "date-asc",
              label: t("date-asc"),
            },
          ]}
        />
      </TableOperations>
      <TableOperations>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </TableOperations>
    </>
  );
}

export default NotificationTableOperations;
