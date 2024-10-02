import { useQuery } from "@tanstack/react-query";
import { getOrganization } from "../../../services/Customization/apiOrganization";

function useViewOrganization(id) {
  const {
    isLoading,
    data: viewOrganizations,
    error,
  } = useQuery({
    queryKey: ["Customization-Organizations", id],
    queryFn: () => getOrganization(id),
    retry: false,
  });
  return { isLoading, viewOrganizations, error };
}

export default useViewOrganization;
