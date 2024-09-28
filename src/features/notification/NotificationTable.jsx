import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import NotificationRow from "./NotificationRow";

function NotificationTable({ notification, isLoading, notificationCount }) {
  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.4fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr "}>
      <Table.TableNav title="Notification Tables" tableData={notification} />
      <Table.Header>
        <div>Id</div>
        <div>Subject</div>
        <div>Message</div>
        <div>Date</div>
        <div>Platform</div>
        <div>Reserver</div>
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
