import { useQuery } from "@tanstack/react-query";
import { getAdmin } from "../../../services/Setting/apiAdmin";

function useViewAdmin(id) {
  const {
    isLoading,
    data: viewAdmin,
    error,
  } = useQuery({
    queryKey: ["Setting-Admin", id],
    queryFn: () => getAdmin(id),
    retry: false,
  });
  return { isLoading, viewAdmin, error };
}

export default useViewAdmin;
