import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import NotificationRow from "./NotificationRow";
import { useTranslation } from "react-i18next";

function NotificationTable({ notification, isLoading, notificationCount }) {
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.4fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr "}>
      <Table.TableNav
        title={t("NotificationTables")}
        tableData={notification}
      />
      <Table.Header>
        <div>Id</div>
        <div>{t("Subject")}</div>
        <div>{t("Message")}</div>
        <div>{t("Date")}</div>
        <div>{t("Platform")}</div>
        <div>{t("Receiver")}</div>
      </Table.Header>

      {!notification?.length ? (
        <Empty resourceName="Notification" />
      ) : (
        <Table.Body
          data={notification}
          render={(notification) => (
            <NotificationRow
              notification={notification}
              key={notification.id}
            />
          )}
        />
      )}

      <Table.Footer>
        <Pagination count={notificationCount} />
      </Table.Footer>
    </Table>
  );
}

export default NotificationTable;
