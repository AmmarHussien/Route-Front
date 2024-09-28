import { useQuery } from "@tanstack/react-query";
import { getStatistic } from "../../services/apiDashboard";

function useStatistics() {
  //query
  const {
    isLoading,
    data: { data: statistics } = {},
    error,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStatistic(),
  });

  return { isLoading, statistics, error };
}

export default useStatistics;
