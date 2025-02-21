import { useQuery } from "@tanstack/react-query";
import { getAllAdmins } from "../../../services/Setting/apiAdmin";
function useGetAdmin() {
  const {
    isLoading,
    data: getAdmin,
    error,
  } = useQuery({
    queryKey: ["Setting-Admin"],
    queryFn: () => getAllAdmins(),
    retry: false,
  });
  return { isLoading, getAdmin, error };
}

export default useGetAdmin;
