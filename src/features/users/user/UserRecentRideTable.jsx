import { useTranslation } from "react-i18next";
import Table from "../../../ui/Table";
import UserRow from "./UserRow";

function UsersRecentRideTable({ rides }) {
  const { t } = useTranslation();
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNaView title={t("RecentRides")} />
      <Table.Header>
        <div>{t("DriverName")}</div>
        <div>{t("DestinationA")}</div>
        <div>{t("DestinationB")}</div>
        <div>{t("Date")}</div>
        <div>{t("Price")}</div>
        <div>{t("Status")}</div>
        <div>{t("UserRate")}</div>
      </Table.Header>

      <Table.Body
        data={rides}
        render={(item) => <UserRow userInfo={item} key={item.id} />}
      />

      <Table.Footer></Table.Footer>
    </Table>
  );
}

export default UsersRecentRideTable;
