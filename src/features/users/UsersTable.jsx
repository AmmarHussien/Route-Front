import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UsersRow from "./UsersRow";

function UsersTable({ users, isLoading, userCount }) {
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!users.length) return <Empty resourceName="Users" />;

  const isBlocked = searchParams.get("status") === "Blocked";

  const columns = isBlocked
    ? "0.4fr 1fr 1fr 1.2fr 0.8fr 0.8fr 0.6fr 0.6fr"
    : "0.4fr 1fr 1.2fr 0.8fr 0.8fr 0.6fr 0.6fr";

  return (
    <Table columns={columns}>
      <Table.TableNav title="Users Tables" tableData={users} />
      <Table.Header>
        <div>Id</div>
        <div>Name</div>
        {isBlocked && <div>Reason</div>}
        <div>Phone Number</div>
        <div>Email</div>
        <div>Number Of Rides</div>
        <div>Rate</div>
        <div>Status</div>
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
