import { useState } from "react";
import useUsers from "./useUsers";
import Row from "../../ui/Row";
import UsersTableOperations from "./UsersTableOperations";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";
import Permission from "../../ui/permission";

function UserLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const { users: allUsers, isLoading, count: userCount } = useUsers(searchTerm);

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <UsersTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
        <Permission requiredPermissions="createUser">
          <AddUser />
        </Permission>
      </Row>

      <UsersTable
        users={allUsers}
        isLoading={isLoading}
        userCount={userCount}
      />
    </>
  );
}

export default UserLayout;
