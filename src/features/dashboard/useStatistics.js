import { useQuery } from "@tanstack/react-query";
import { getStatistic } from "../../services/apiDashboard";
import { useTranslation } from "react-i18next";

function useStatistics() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  //query
  const {
    isLoading,
    data: { data: statistics } = {},
    error,
  } = useQuery({
    queryKey: ["statistics", isRTL],
    queryFn: () => getStatistic(isRTL),
  });

  return { isLoading, statistics, error };
}

export default useStatistics;
