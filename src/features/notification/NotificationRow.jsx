import Table from "../../ui/Table";
import styled, { css } from "styled-components";

const PlatformSpan = styled.span`
  ${(props) =>
    props.$platform === "Sms" &&
    css`
      color: #f97316;
    `}
  ${(props) =>
    props.$platform === "Ios" &&
    css`
      color: #ec4899;
    `}
  ${(props) =>
    props.$platform === "Android" &&
    css`
      color: #a855f7;
    `}
`;

const PlatformWrapper = styled.div`
  ${({ $multiple }) =>
    $multiple &&
    css`
      padding: 5px;
    `}
`;

const ReseverSpan = styled.span`
  ${(props) =>
    props.$platform === "Driver" &&
    css`
      color: #38bdf8;
    `}
  ${(props) =>
    props.$platform === "User" &&
    css`
      color: #22c55e;
    `}
`;

const ReseverWrapper = styled.div`
  ${({ $multiple }) =>
    $multiple &&
    css`
      padding: 5px;
    `}
`;

function NotificationRow({ notification }) {
  return (
    <Table columns={"0.4fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr "}>
      <Table.Row>
        <>
          <div>{notification.id}</div>
          <div>{notification.subject}</div>
        </>

        <div>{notification.message}</div>

        <div>{notification.date}</div>

        <PlatformWrapper
          $multiple={notification.platform.split("-").length > 1}
        >
          {notification.platform
            .split("-")
            .map((platformItem, index, array) => (
              <PlatformSpan key={platformItem} $platform={platformItem}>
                {platformItem}
                {index < array.length - 1 && " - "}
              </PlatformSpan>
            ))}
        </PlatformWrapper>

        <ReseverWrapper $multiple={notification.app_type.split("-").length > 1}>
          {notification.app_type.split("-").map((appTypeItem, index, array) => (
            <ReseverSpan key={appTypeItem} $platform={appTypeItem}>
              {appTypeItem}
              {index < array.length - 1 && " - "}
            </ReseverSpan>
          ))}
        </ReseverWrapper>
      </Table.Row>
    </Table>
  );
}

export default NotificationRow;
