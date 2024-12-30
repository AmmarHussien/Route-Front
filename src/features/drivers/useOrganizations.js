import { useQuery } from "@tanstack/react-query";
import { getAllOrganization } from "../../services/apiOrganizations";

function useOrganizations() {
  const {
    isLoading,
    data: organizations,
    error,
  } = useQuery({
    queryKey: ["Organizations"],
    queryFn: () => getAllOrganization(),
    retry: false,
  });
  return { isLoading, organizations, error };
}

export default useOrganizations;
