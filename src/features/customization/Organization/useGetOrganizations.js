import { useQuery } from "@tanstack/react-query";
import { getAllOrganizations } from "../../../services/Customization/apiOrganization";

function useGetOrganizations() {
  const {
    isLoading,
    data: getOrganizations,
    error,
  } = useQuery({
    queryKey: ["Customization-Organizations"],
    queryFn: () => getAllOrganizations(),
    retry: false,
  });
  return { isLoading, getOrganizations, error };
}

export default useGetOrganizations;
