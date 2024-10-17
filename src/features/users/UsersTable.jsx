import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UsersRow from "./UsersRow";
import { useTranslation } from "react-i18next";

function UsersTable({ users, isLoading, userCount }) {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  if (!users.length) return <Empty resourceName="Users" />;

  const isBlocked = searchParams.get("status") === "Blocked";

  const columns = isBlocked
    ? "0.4fr 1fr 1fr 1.2fr 0.8fr 0.8fr 0.6fr 0.6fr"
    : "0.4fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr 0.6fr";

  return (
    <Table columns={columns}>
      <Table.TableNav title={t("UsersTables")} tableData={users} />
      <Table.Header>
        <div>{t("UserID")}</div>
        <div>{t("UserName")}</div>
        {isBlocked && <div>{t("UserBlockedReason")}</div>}
        <div>{t("UserPhoneNumber")}</div>
        <div>{t("UserEmail")}</div>
        <div>{t("UserNumberOfRides")}</div>
        <div>{t("UserRate")}</div>
        <div>{t("UserStatus")}</div>
      </Table.Header>

      <Table.Body
        data={users}
        render={(user) => <UsersRow userInfo={user} key={user.id} />}
      />

      <Table.Footer>
        <Pagination count={userCount} />
      </Table.Footer>
    </Table>
  );
}

export default UsersTable;
