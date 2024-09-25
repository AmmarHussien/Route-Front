import { useState } from "react";
import Row from "../ui/Row";
import NotificationTableOperations from "../features/notification/notificationTableOperations";
import NewNotification from "../features/notification/NewNotification";
import NotificationTable from "../features/notification/NotificationTable";
import useSearchNotification from "../features/notification/useSearchNotification";
import useNotification from "../features/notification/useNotification";

function PushNotification() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchNotification, count: searchCount } =
    useSearchNotification(searchTerm);
  const { isLoading, notification, count } = useNotification();

  const usersToDisplay = searchTerm ? searchNotification : notification;
  const countToDisplay = searchTerm ? searchCount : count;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <NotificationTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
        <NewNotification />
      </Row>
      <NotificationTable
        notification={usersToDisplay}
        isLoading={isLoading}
        notificationCount={countToDisplay}
      />

      {/* <UsersTable
        users={usersToDisplay}
        isLoading={isLoading}
        userCount={countToDisplay}
      /> */}
    </>
  );
}

export default PushNotification;
