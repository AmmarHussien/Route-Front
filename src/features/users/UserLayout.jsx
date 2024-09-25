import { useState } from "react";
import useSearchUsers from "./useSearchUser";
import useUsers from "./useUsers";
import Row from "../../ui/Row";
import UsersTableOperations from "./UsersTableOperations";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";

function UserLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchList, count: searchCount } = useSearchUsers(searchTerm);
  const { users: allUsers, isLoading, count: userCount } = useUsers();

  const usersToDisplay = searchTerm ? searchList : allUsers;
  const countToDisplay = searchTerm ? searchCount : userCount;

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
        users={usersToDisplay}
        isLoading={isLoading}
        userCount={countToDisplay}
      />
    </>
  );
}

export default UserLayout;
