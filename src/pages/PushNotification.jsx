import { useState } from "react";
import Row from "../ui/Row";
import NotificationTableOperations from "../features/notification/notificationTableOperations";
import NewNotification from "../features/notification/NewNotification";
import NotificationTable from "../features/notification/NotificationTable";

import useNotification from "../features/notification/useNotification";

function PushNotification() {
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, notification, count } = useNotification(searchTerm);

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
        notification={notification}
        isLoading={isLoading}
        notificationCount={count}
      />
    </>
  );
}

export default PushNotification;
