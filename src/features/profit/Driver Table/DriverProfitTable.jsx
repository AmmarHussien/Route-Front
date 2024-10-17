import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Empty from "../../../ui/Empty";
import Spinner from "../../../ui/Spinner";
import DriverProfitRow from "./DriverProfitRow";
import { useTranslation } from "react-i18next";

function DriverProfitTable({ profit, isLoading, profitCount }) {
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.6fr 1fr 1fr 1fr 1fr 1fr 1fr"}>
      <Table.TableNav title={t("AdminProfit")} tableData={profit} />
      <Table.Header>
        <div>{t("DriverID")}</div>
        <div>{t("DriverName")}</div>

        <div>{t("BankAccount")}</div>
        <div>{t("TotalRidesPayment")}</div>
        <div>{t("SiteCommission")}</div>
        <div>{t("Driver’sShare")}</div>
        <div>{t("PaymentMethod")}</div>
      </Table.Header>

      <Table.Body
        data={profit}
        render={(profit) =>
          profit.length ? (
            <Empty resourceName="Profits" />
          ) : (
            <DriverProfitRow
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

export default DriverProfitTable;
