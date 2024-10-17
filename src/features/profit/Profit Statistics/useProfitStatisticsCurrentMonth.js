import { useQuery } from "@tanstack/react-query";
import { getProfitStatisticCurrentMonth } from "../../../services/apiProfit";
import { useTranslation } from "react-i18next";

function useProfitStatisticCurrentMonth() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  //query
  const {
    isLoading,
    data: { data: profitStatistics } = {},
    error,
  } = useQuery({
    queryKey: ["Profit-Statistics-current-Month", isRTL],
    queryFn: () => getProfitStatisticCurrentMonth(isRTL),
  });

  return { isLoading, profitStatistics, error };
}

export default useProfitStatisticCurrentMonth;
