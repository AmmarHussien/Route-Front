import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function UsersTableOperations({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();

  return (
    <>
      <TableOperations>
        <Filter
          filterField="status"
          options={[
            { value: "Approved", label: t("Approved") },

            { value: "Blocked", label: t("Blocked") },
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
              value: "first_name-asc",
              label: t("first_name-asc"),
            },
            {
              value: "first_name-desc",
              label: t("first_name-desc"),
            },
            {
              value: "phone-asc",
              label: t("phone-asc"),
            },
            {
              value: "phone-desc",
              label: t("phone-desc"),
            },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default UsersTableOperations;
