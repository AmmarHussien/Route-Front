import { useTranslation } from "react-i18next";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ProfitTableOperations({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();

  return (
    <>
      <TableOperations>
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
            {
              value: "total-desc",
              label: t("total-desc"),
            },
            {
              value: "total-asc",
              label: t("total-asc"),
            },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default ProfitTableOperations;
