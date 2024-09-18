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
//import { UseDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import useRevenues from "./useRevenues";

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
  //const { isDarkMode } = UseDarkMode();

  const [currentMonth, setCurrentMonth] = useState(new Date());

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
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

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
            (booking) =>
              format(new Date(booking.drop_off_date), "MMM dd") ===
              formattedDate
          ) // assuming the year 2024
          .reduce((acc, cur) => acc + cur.total, 0),
        // extrasSales: bookings
        //   .filter(
        //     (booking) =>
        //       format(new Date(booking.created_at + " 2024"), "MMM dd") ===
        //       formattedDate
        //   ) // assuming the year 2024
        //   .reduce((acc, cur) => acc + cur.extrasPrice, 0),
      };
    });

  // const colors = isDarkMode
  //   ? {
  //       totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
  //       extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
  //       text: "#e5e7eb",
  //       background: "#18212f",
  //     }
  //   : {
  //       totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  //       extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  //       text: "#374151",
  //       background: "#fff",
  //     };

  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    //extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <StyledSalesChart>
      <StyledSalesChartHeader>
        <StyledSalesChartHeaderLeft>
          <Heading variant="h6">Total Revenues</Heading>
          <Heading variant="h5">
            Indication for the total revenue over this month
          </Heading>
        </StyledSalesChartHeaderLeft>

        <StyledSalesChartHeaderRight>
          <KeyboardArrowLeftIcon
            cursor="pointer"
            onClick={handlePrevMonth}
            sx={{
              fontSize: "50px",
            }}
          />
          <Heading as="h2"> {monthName} </Heading>
          <ChevronRightIcon
            cursor="pointer"
            onClick={handleNextMonth}
            sx={{
              fontSize: "50px",
            }}
          />
        </StyledSalesChartHeaderRight>
      </StyledSalesChartHeader>
      <ResponsiveContainer height={400} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
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
            name="Total Revenues"
            unit="$"
          />
          {/* <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
