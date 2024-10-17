import ProfitRow from "./AdminProfitRow";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Empty from "../../../ui/Empty";
import Spinner from "../../../ui/Spinner";
import { useTranslation } from "react-i18next";

function ProfitTable({ profit, isLoading, profitCount }) {
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.6fr 1fr 1fr 1fr 1fr 1fr 1fr 1.4fr"}>
      <Table.TableNav title={t("AdminProfit")} tableData={profit} />
      <Table.Header>
        <div>{t("RideID")}</div>
        <div>{t("DriverName")}</div>
        <div>{t("UserName")}</div>
        <div>{t("TotalAmount")}</div>
        <div>{t("SiteCommission")}</div>
        <div>{t("Driver’sShare")}</div>
        <div>{t("PaymentMethod")}</div>
        <div>{t("Date")}</div>
      </Table.Header>

      <Table.Body
        data={profit}
        render={(profit) =>
          profit.length ? (
            <Empty resourceName="Profits" />
          ) : (
            <ProfitRow
              profitInfo={profit}
              key={profit.id}
              isLoading={isLoading}
            />
          )
        }
      />

      <Table.Footer>
        <Pagination count={profitCount} />
      </Table.Footer>
    </Table>
  );
}

export default ProfitTable;
