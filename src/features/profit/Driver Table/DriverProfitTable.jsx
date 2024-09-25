import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Empty from "../../../ui/Empty";
import Spinner from "../../../ui/Spinner";
import DriverProfitRow from "./DriverProfitRow";

function DriverProfitTable({ profit, isLoading, profitCount }) {
  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.6fr 1fr 1fr 1fr 1fr 1fr 1fr"}>
      <Table.TableNav title="Admin Profit" tableData={profit} />
      <Table.Header>
        <div>Driver ID</div>
        <div>Driver Name</div>

        <div>Bank Account</div>
        <div>Total Rides Payment</div>
        <div>Site Commission</div>
        <div>Driver’s Share</div>
        <div>Payment Method</div>
      </Table.Header>

      <Table.Body
        data={profit}
        render={(profit) =>
          profit.length ? (
            <Empty resourceName="Profits" />
          ) : (
            <DriverProfitRow
              profitInfo={profit}
              key={profit.id}
              isLoading={isLoading}
            />
          )
        }
      />

      <Table.Footer>
        <Pagination count={profitCount} />
      </Table.Footer>
    </Table>
  );
}

export default DriverProfitTable;
