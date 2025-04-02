import { useTranslation } from "react-i18next";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import useStatistics from "../useStatistics";
import RideRow from "./RecentRideRow";

function RecentRide() {
  const { statistics } = useStatistics();
  const { t } = useTranslation();

  return (
    <Menus>
      <Table columns="0.4fr 1fr 1.6fr 1.6fr 1.2fr 0.8fr 0.5fr">
        <Table.TableNaView title={t("RecentRides")} />
        <Table.Header>
          <div>{t("ID")}</div>
          <div>{t("DriverName")}</div>
          <div>{t("DestinationA")}</div>
          <div>{t("DestinationB")}</div>
          <div>{t("Date")}</div>
          <div>{t("Price")}</div>
          <div>{t("Status")}</div>
        </Table.Header>

        <Table.Body
          data={statistics.rides}
          render={(rides) => <RideRow ride={rides} key={rides.id} />}
        />

        <Table.Footer>
          <p>{t("Summary")}</p>
          {/* <Pagination count={statistics.rides.length} /> */}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RecentRide;
