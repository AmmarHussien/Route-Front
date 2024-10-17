import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import useRevenues from "./useRevenues";
import { useTranslation } from "react-i18next";
import { ar } from "date-fns/locale"; // Import the Arabic locale

const StyledSalesChart = styled(DashboardBox)`
  padding: 3.2rem;
  display: grid;
  flex: 2;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;

  flex: 1;
  width: 744px;
  height: 480px;
  top: 165px;
  padding: 24px 16.18px 55.96px 16px;
  gap: 0px;
  border-radius: 24px;
  opacity: 1px;
  box-shadow: 0px 4px 15px 0px #27242414;

  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const StyledSalesChartHeader = styled.div`
  height: 45px;
  top: 24px;
  left: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledSalesChartHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 10px;
  margin-bottom: 50px;
  gap: 8px;
`;

const StyledSalesChartHeaderRight = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
`;

function SalesChart() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const { revenues } = useRevenues(
    format(currentMonth, "yyyy"),
    format(currentMonth, "MM")
  );

  // Calculate the start and end dates for the current month
  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);

  // Generate a list of all dates in the current month
  const allDates = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);

      // Get the current date
      const currentDate = new Date();

      // If the new month is greater than the current month, do not update
      if (newMonth > currentDate) {
        return prevMonth; // Return the previous month, no update
      }

      return newMonth;
    });
  };
  const monthName = format(currentMonth, "MMM", {
    locale: isRTL ? ar : undefined,
  });

  const formattedDate = new Intl.DateTimeFormat("ar", {
    month: "short",
  }).format(currentMonth);

  useEffect(() => {}, [currentMonth]);

  const data = allDates
    .filter(
      (date) => format(date, "MMM yyyy") === format(currentMonth, "MMM yyyy")
    )
    .map((date) => {
      const formattedDate = format(date, "MMM dd");
      return {
        label: formattedDate,
        totalRevenues: revenues
          .filter(
            (revenue) =>
              format(new Date(revenue.drop_off_date), "MMM dd") ===
              formattedDate
          ) // assuming the year 2024
          .reduce((acc, cur) => acc + cur.total, 0),
      };
    });

  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },

    text: "#374151",
    background: "#fff",
  };

  return (
    <StyledSalesChart>
      <StyledSalesChartHeader>
        <StyledSalesChartHeaderLeft>
          <Heading $variant="h6">{t("TotalRevenue")}</Heading>
          <Heading $variant="h5">{t("TotalRevenueSlogan")} </Heading>
        </StyledSalesChartHeaderLeft>

        <StyledSalesChartHeaderRight>
          {isRTL ? (
            <ChevronRightIcon
              cursor="pointer"
              onClick={handleNextMonth}
              sx={{
                fontSize: "50px",
              }}
            />
          ) : (
            <KeyboardArrowLeftIcon
              cursor="pointer"
              onClick={handlePrevMonth}
              sx={{
                fontSize: "50px",
              }}
            />
          )}

          <Heading as="h2"> {isRTL ? formattedDate : monthName} </Heading>
          {i18n.language === "ar-EG" ? (
            <KeyboardArrowLeftIcon
              cursor="pointer"
              onClick={handlePrevMonth}
              sx={{
                fontSize: "50px",
              }}
            />
          ) : (
            <ChevronRightIcon
              cursor="pointer"
              onClick={handleNextMonth}
              sx={{
                fontSize: "50px",
              }}
            />
          )}
        </StyledSalesChartHeaderRight>
      </StyledSalesChartHeader>
      <ResponsiveContainer height={400} width="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            bottom: 20,
            right: isRTL ? 50 : 0, // Add right margin for RTL
          }}
        >
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            //mirror={isRTL} // Conditionally flip based on language
            reversed={isRTL} // Reverse direction for RTL
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            orientation={isRTL ? "right" : "left"} // Move Y-axis to right in RTL mode
            mirror={isRTL} // Conditionally flip based on language
            tickMargin={isRTL ? -10 : 0} // Add margin between the axis and the text in RTL mode
            width={50} // Ensure there's enough space for the text
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <Area
            dataKey="totalRevenues"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name={t("TotalRevenue")}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
