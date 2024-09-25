import ProfitRow from "./AdminProfitRow";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Empty from "../../../ui/Empty";
import Spinner from "../../../ui/Spinner";

function ProfitTable({ profit, isLoading, profitCount }) {
  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.6fr 1fr 1fr 1fr 1fr 1fr 1fr 1.4fr"}>
      <Table.TableNav title="Admin Profit" tableData={profit} />
      <Table.Header>
        <div>Ride ID</div>
        <div>Driver Name</div>
        <div>User Name</div>
        <div>Total Amount</div>
        <div>Site Commission</div>
        <div>Driver’s Share</div>
        <div>Payment Method</div>
        <div>Date</div>
      </Table.Header>

      <Table.Body
        data={profit}
        render={(profit) =>
          profit.length ? (
            <Empty resourceName="Profits" />
          ) : (
            <ProfitRow
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

export default ProfitTable;
