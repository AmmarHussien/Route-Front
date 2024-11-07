import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function RidesTableOperations({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();

  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "All", label: t("AllRide") },
          { value: "Completed", label: t("Completed") },
          // { value: "Ongoing", label: "Ongoing" },
          { value: "Scheduled", label: t("Scheduled") },
          { value: "Cancelled", label: t("Cancelled") },
        ]}
      />

      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <SortBy
        options={[
          {
            value: "id-desc",
            label: t("id-desc"),
          },
          {
            value: "id-asc",
            label: t("id-asc"),
          },
          {
            value: "created_at-desc",
            label: t("created_at-desc"),
          },
          {
            value: "created_at-asc",
            label: t("created_at-asc"),
          },
        ]}
      />
    </TableOperations>
  );
}

export default RidesTableOperations;
