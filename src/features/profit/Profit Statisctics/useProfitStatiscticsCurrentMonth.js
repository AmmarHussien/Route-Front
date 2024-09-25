import { useQuery } from "@tanstack/react-query";
import { getProfitStatisticCurrentMonth } from "../../../services/apiProfit";

function useProfitStatisticCurrentMonth() {
  //query
  const {
    isLoading,
    data: { data: profitStatistics } = {},
    error,
  } = useQuery({
    queryKey: ["Profit-Statistics-current-Month"],
    queryFn: () => getProfitStatisticCurrentMonth(),
  });

  return { isLoading, profitStatistics, error };
}

export default useProfitStatisticCurrentMonth;
