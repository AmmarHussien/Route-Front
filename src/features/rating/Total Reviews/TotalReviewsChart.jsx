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

function TotalReviewsChart({ currentMonth, users = [], drivers = [] }) {
  const current = new Date();
  // Calculate the start and end dates for the current month
  // Calculate the start date as the beginning of the current month
  const startOfCurrentMonth = startOfMonth(currentMonth);

  //const endOfCurrentMonth = endOfMonth(startOfCurrentMonth);

  let endOfCurrentMonth;

  // Check if the current date is in the same month as the start of the current month
  if (startOfCurrentMonth.getMonth() === current.getMonth()) {
    // If it's the same month, set the end date to today (current date)
    endOfCurrentMonth = current;
  } else {
    // Otherwise, set the end date to the last day of the current month
    endOfCurrentMonth = endOfMonth(startOfCurrentMonth);
  }

  // Generate a list of all dates in the current month
  const allDates = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  const data = allDates.map((date) => {
    const formattedDate = format(date, "dd MMM");
    const totalReviewsUser = users
      .filter(
        (total) =>
          format(new Date(total.created_at), "dd MMM") === formattedDate
      )
      .reduce((acc, cur) => acc + cur.total, 0);

    const totalReviewsDriver = drivers
      .filter(
        (total) =>
          format(new Date(total.created_at), "dd MMM") === formattedDate
      )
      .reduce((acc, cur) => acc + cur.total, 0);

    return {
      label: formattedDate,
      totalReviewsUser,
      totalReviewsDriver,
    };
  });

  const colors = {
    totalReviewsUser: { stroke: "#4f46e5", fill: "#c7d2fe" },
    totalReviewsDriver: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <ResponsiveContainer height={250}>
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
          contentStyle={{ backgroundColor: colors.background }}
          aria-label="Chart tooltip"
        />
        <Area
          dataKey="totalReviewsDriver"
          type="monotone"
          stroke={colors.totalReviewsDriver.stroke}
          fill={colors.totalReviewsDriver.fill}
          strokeWidth={2}
          name="Total Reviews Drivers"
        />
        <Area
          dataKey="totalReviewsUser"
          type="monotone"
          stroke={colors.totalReviewsUser.stroke}
          fill={colors.totalReviewsUser.fill}
          strokeWidth={2}
          name="Total Reviews User"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TotalReviewsChart;
