import { useQuery } from "@tanstack/react-query";
import { getAllRole } from "../../../services/Setting/apiRole";

function useGetRole() {
  const {
    isLoading,
    data: getRole,
    error,
  } = useQuery({
    queryKey: ["Setting-Roles"],
    queryFn: () => getAllRole(),
    staleTime: 0, // ✅ Prevents caching
    refetchOnWindowFocus: true, // ✅ Always refetch on window focus
    refetchOnMount: true, // ✅ Refetch on every component mount
  });

  return { isLoading, getRole, error };
}

export default useGetRole;
