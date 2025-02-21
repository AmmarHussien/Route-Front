import { useQuery } from "@tanstack/react-query";
import { getAllPermissions } from "../../services/Setting/apiPermissions";
function useGetPermissions() {
  const {
    isLoading,
    data: getPermissions,
    error,
  } = useQuery({
    queryKey: ["Setting-Role"],
    queryFn: () => getAllPermissions(),
    retry: false,
  });
  return { isLoading, getPermissions, error };
}

export default useGetPermissions;
