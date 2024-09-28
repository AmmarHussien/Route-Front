import { useQuery } from "@tanstack/react-query";
import { getProfitStatisticLastMonth } from "../../../services/apiProfit";

function useProfitStatisticLastMonth() {
  //query
  const {
    isLoading,
    data: { data: profitStatistics } = {},
    error,
  } = useQuery({
    queryKey: ["Profit-Statistics-Last-Month"],
    queryFn: () => getProfitStatisticLastMonth(),
  });

  return { isLoading, profitStatistics, error };
}

export default useProfitStatisticLastMonth;
