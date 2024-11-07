import { useState } from "react";
import useUsers from "./useUsers";
import Row from "../../ui/Row";
import UsersTableOperations from "./UsersTableOperations";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";

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
        <AddUser />
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
