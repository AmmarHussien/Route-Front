import styled from "styled-components";
import ProfitStat from "./ProfitStat";
import { useTranslation } from "react-i18next";

const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background: ${(props) => props.color || "#f8f9fa"};
`;

function ProfitStats({
  totalEarningThisMonth,
  totalEarningPastMonth,
  paymentToDriversThisMonth,
  paymentToDriversPastMonth,
  paymentToSiteThisMonth,
  paymentToSitePastMonth,
  totalRidesAmountThisMonth,
  totalRidesAmountPastMonth,
  containerColor,
  currency,
}) {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("TotalEarning"),
      colorIconBackground: "#6366F1",
      icon: "/TotalE.svg",
      thisMonthValue: totalEarningThisMonth,
      pastMonthValue: totalEarningPastMonth,
    },
    {
      title: t("PaymentToSite"),
      colorIconBackground: "#A855F7",
      icon: "/Money.svg",
      thisMonthValue: paymentToSiteThisMonth,
      pastMonthValue: paymentToSitePastMonth,
    },
    {
      title: t("PaymentToDrivers"),
      colorIconBackground: "#F43F5E",
      icon: "/Driversw.svg",
      thisMonthValue: paymentToDriversThisMonth,
      pastMonthValue: paymentToDriversPastMonth,
    },
    {
      title: t("TotalRidesAmount"),
      colorIconBackground: "#F97316",
      icon: "/Money.svg",
      thisMonthValue: totalRidesAmountThisMonth,
      pastMonthValue: totalRidesAmountPastMonth,
    },
  ];

  return (
    <StatContainer color={containerColor}>
      {stats.map(
        (
          { title, colorIconBackground, icon, thisMonthValue, pastMonthValue },
          index
        ) =>
          thisMonthValue !== undefined && pastMonthValue !== undefined ? (
            <ProfitStat
              key={index}
              backgroundColor="#FFFFFF"
              title={title}
              colorIconBackground={colorIconBackground}
              icon={icon}
              thisMonthValue={thisMonthValue}
              pastMonthValue={pastMonthValue}
              currency={currency}
            />
          ) : null
      )}
    </StatContainer>
  );
}

export default ProfitStats;
