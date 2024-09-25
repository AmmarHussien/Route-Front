import Spinner from "../../../ui/Spinner";
import RatingStats from "./ProfitStats";
import useProfitStatisticCurrentMonth from "./useProfitStatiscticsCurrentMonth";
import useProfitStatisticLastMonth from "./useProfitStatiscticsLastMonth";

function ProfitStatisctics() {
  const { isLoading: currentMonthLoading, profitStatistics: currentMonth } =
    useProfitStatisticCurrentMonth();

  const { isLoading: lastMonthLoading, profitStatistics: lastMonth } =
    useProfitStatisticLastMonth();

  if (currentMonthLoading || lastMonthLoading) return <Spinner />;

  return (
    <>
      <RatingStats
        totalEarningThisMonth={currentMonth.total_earnings}
        totalEarningPastMonth={lastMonth.total_earnings}
        paymentToSiteThisMonth={currentMonth.site_commission}
        paymentToSitePastMonth={lastMonth.site_commission}
        paymentToDriversThisMonth={currentMonth.drivers_commission}
        paymentToDriversPastMonth={lastMonth.drivers_commission}
        totalRidesAmountThisMonth={currentMonth.total_amount}
        totalRidesAmountPastMonth={lastMonth.total_amount}
        currency={currentMonth.currency}
      />
    </>
  );
}

export default ProfitStatisctics;
