import { useState } from "react";
import Row from "../ui/Row";
import NotificationTableOperations from "../features/notification/notificationTableOperations";
import NewNotification from "../features/notification/NewNotification";
import NotificationTable from "../features/notification/NotificationTable";

import useNotification from "../features/notification/useNotification";
import Permission from "../ui/permission";

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
        <Permission requiredPermissions="createNotification">
          <NewNotification />
        </Permission>
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
