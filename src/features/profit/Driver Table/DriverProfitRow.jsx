import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import styled, { css } from "styled-components";

const PaymentMethod = styled.div`
  ${(props) =>
    props.$payment_method === "Cash" &&
    css`
      color: #f97316;
    `}
  ${(props) =>
    props.$payment_method === "Online" &&
    css`
      color: #ec4899;
    `}
  ${(props) =>
    props.$payment_method === "Wallet" &&
    css`
      color: #a855f7;
    `}
`;

function DriverProfitRow({ profitInfo, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.6fr 1fr 1fr 1fr 1fr 1fr 1fr"}>
      <Table.Row>
        <div>{profitInfo.driver.id}</div>
        <div>{profitInfo.driver.name}</div>

        <div>---</div>
        <div>
          {profitInfo.total} {profitInfo.currency}
        </div>
        <div>
          {profitInfo.site_commission} {profitInfo.currency}
        </div>
        <div>
          {profitInfo.driver_commission} {profitInfo.currency}
        </div>
        <PaymentMethod $payment_method={profitInfo.payment_method}>
          {profitInfo.payment_method}
        </PaymentMethod>
      </Table.Row>
    </Table>
  );
}

export default DriverProfitRow;
