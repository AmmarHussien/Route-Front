import { useTranslation } from "react-i18next";
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
  width: 160px;
  ${({ $multiple }) =>
    $multiple &&
    css`
      padding: 5px;
    `}
`;

const ReserverSpan = styled.span`
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

const ReserverWrapper = styled.div`
  ${({ $multiple }) =>
    $multiple &&
    css`
      padding: 5px;
    `}
`;

function NotificationRow({ notification }) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
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
                {isRTL ? t(`platformItem.${platformItem}`) : platformItem}
                {index < array.length - 1 && " - "}
              </PlatformSpan>
            ))}
        </PlatformWrapper>

        <ReserverWrapper
          $multiple={notification.app_type.split("-").length > 1}
        >
          {notification.app_type.split("-").map((appTypeItem, index, array) => (
            <ReserverSpan key={appTypeItem} $platform={appTypeItem}>
              {isRTL ? t(`appTypeItem.${appTypeItem}`) : appTypeItem}

              {index < array.length - 1 && " - "}
            </ReserverSpan>
          ))}
        </ReserverWrapper>
      </Table.Row>
    </Table>
  );
}

export default NotificationRow;
