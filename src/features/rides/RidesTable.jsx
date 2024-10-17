import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import RidesRow from "./RidesRow";
import { useTranslation } from "react-i18next";

function RidesTable({ rides, isLoading, ridesCount }) {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("status");
  const { t } = useTranslation();

  // Show the loading spinner while the data is being fetched
  if (isLoading) return <Spinner />;

  // Show an empty state if there are no drivers to display
  if (!rides.length) return <Empty resourceName="Rides" />;

  return (
    <Table columns="0.4fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNav title={t("ALLRides")} tableData={rides} />
      <Table.Header>
        <div>{t("RideID")}</div>
        <div>{t("DriverName")}</div>
        <div>{t("UserName")}</div>
        <div>{t("CreatedDate")}</div>
        {params === "Scheduled" ? (
          <div>{"ScheduledDate"}</div>
        ) : (
          <div>{t("Price")}</div>
        )}

        <div>{t("Status")}</div>
      </Table.Header>

      <Table.Body
        data={rides}
        render={(item) => <RidesRow RideInfo={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={ridesCount} />
      </Table.Footer>
    </Table>
  );
}

export default RidesTable;
