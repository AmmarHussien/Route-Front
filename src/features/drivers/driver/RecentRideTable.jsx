import { useTranslation } from "react-i18next";
import Table from "../../../ui/Table";
import RideRow from "./RideRow";

function RecentRideTable({ rides }) {
  const { t } = useTranslation();

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNaView title={t("RecentRides")} />
      <Table.Header>
        <div>{t("UserName")}</div>
        <div>{t("DestinationA")}</div>
        <div>{t("DestinationB")}</div>
        <div>{t("Date")}</div>
        <div>{t("Price")}</div>
        <div>{t("SiteCommission")}</div>
        <div>{t("PaymentMethod")}</div>
        <div>{t("Status")}</div>
        <div>{t("UserRate")}</div>
      </Table.Header>
      <Table.Body
        data={rides}
        render={(rides) => <RideRow rideInfo={rides} key={rides.id} />}
      />

      <Table.Footer></Table.Footer>
    </Table>
  );
}

export default RecentRideTable;
