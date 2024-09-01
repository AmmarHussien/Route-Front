import { useQuery } from "@tanstack/react-query";
import { getRevenues } from "../../services/apiDashboard";

function useRevenues(year, month) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Revenues", year, month],
    queryFn: async () => {
      const response = await getRevenues(year, month);
      return response;
    },
    enabled: !!year && !!month,
  });

  const revenues = data || []; // Adjust based on your API response structure

  return { isLoading, revenues, error };
}

export default useRevenues;
