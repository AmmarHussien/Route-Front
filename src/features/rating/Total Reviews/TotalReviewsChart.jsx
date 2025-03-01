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
import { useTranslation } from "react-i18next";

function TotalReviewsChart({ currentMonth, users = [], drivers = [] }) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
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
      <AreaChart
        data={data}
        margin={{
          top: 20,
          bottom: 20,
          right: isRTL ? 40 : 0, // Add right margin for RTL
        }}
      >
        <XAxis
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
          reversed={isRTL}
        />
        <YAxis
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
          orientation={isRTL ? "right" : "left"} // Move Y-axis to right in RTL mode
          mirror={isRTL} // Conditionally flip based on language
          tickMargin={isRTL ? -10 : 0} // Add margin between the axis and the text in RTL mode
          //width={80} // Ensure there's enough space for the text
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
          name={t("TotalReviewsDrivers")}
        />
        <Area
          dataKey="totalReviewsUser"
          type="monotone"
          stroke={colors.totalReviewsUser.stroke}
          fill={colors.totalReviewsUser.fill}
          strokeWidth={2}
          name={t("TotalReviewsUser")}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TotalReviewsChart;
