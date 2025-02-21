import { useQuery } from "@tanstack/react-query";
import { getRole } from "../../../services/Setting/apiRole";

function useViewRole(id) {
  const {
    isLoading,
    data: viewRole,
    error,
  } = useQuery({
    queryKey: ["Setting-Role", id],
    queryFn: () => getRole(id),
    retry: false,
  });
  return { isLoading, viewRole, error };
}

export default useViewRole;
