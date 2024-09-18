import { useQuery } from "@tanstack/react-query";
import { getAllOrganizations } from "../../services/apiOrganizations";

function useOrganizations() {
  const {
    isLoading,
    data: organizations,
    error,
  } = useQuery({
    queryKey: ["Organizations"],
    queryFn: () => getAllOrganizations(),
    retry: false,
  });
  return { isLoading, organizations, error };
}

export default useOrganizations;
