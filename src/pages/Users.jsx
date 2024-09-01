import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UsersTable from "../features/users/UsersTable";
import AddUser from "../features/users/AddUser";
import UsersTableOperations from "../features/users/UsersTableOperations";
import { useState } from "react";
import useSearchUsers from "../features/users/useSearchUser";
import useUsers from "../features/users/useUsers";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchList, count: searchCount } = useSearchUsers(searchTerm);
  const { users: allUsers, isLoading, count: userCount } = useUsers();

  const usersToDisplay = searchTerm ? searchList : allUsers;
  const countToDisplay = searchTerm ? searchCount : userCount;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading variant="h1">Users</Heading>
          <UsersTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
        <AddUser />
      </Row>

      <UsersTable
        users={usersToDisplay}
        isLoading={isLoading}
        userCount={countToDisplay}
      />
    </>
  );
}

export default Users;
