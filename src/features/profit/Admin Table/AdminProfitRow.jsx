import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import styled, { css } from "styled-components";

const PaymentMethod = styled.div`
  ${(props) =>
    (props.$payment_method === "Cash" || props.$payment_method === "نقدا") &&
    css`
      color: #f97316;
    `}

  ${(props) =>
    (props.$payment_method === "Online" ||
      props.$payment_method === "أونلاين") &&
    css`
      color: #ec4899;
    `}
  ${(props) =>
    (props.$payment_method === "Wallet" ||
      props.$payment_method === "المحفظة") &&
    css`
      color: #a855f7;
    `}
`;

function ProfitRow({ profitInfo, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <Table columns={"0.6fr 1fr 1fr 1fr 1fr 1fr 1fr 1.4fr"}>
      <Table.Row>
        <div>{profitInfo.id} </div>
        <div>{profitInfo.driver_name} </div>
        <div>{profitInfo.user_name}</div>
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
        <div>{profitInfo.created_at}</div>
      </Table.Row>
    </Table>
  );
}

export default ProfitRow;
