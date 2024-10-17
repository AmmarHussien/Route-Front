import { useQuery } from "@tanstack/react-query";
import { getProfitStatisticLastMonth } from "../../../services/apiProfit";
import { useTranslation } from "react-i18next";

function useProfitStatisticLastMonth() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  //query
  const {
    isLoading,
    data: { data: profitStatistics } = {},
    error,
  } = useQuery({
    queryKey: ["Profit-Statistics-Last-Month", isRTL],
    queryFn: () => getProfitStatisticLastMonth(isRTL),
  });

  return { isLoading, profitStatistics, error };
}

export default useProfitStatisticLastMonth;
