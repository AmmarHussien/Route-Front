import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getManufacture } from "../../../../services/Customization/apiManufactures";

function useViewManufactures() {
  const { Id } = useParams();
  const {
    isLoading,
    data: manufactures,
    error,
  } = useQuery({
    queryKey: ["Customization-Manufactures", Id],
    queryFn: () => getManufacture(Id),
    retry: false,
  });
  return { isLoading, manufactures, error };
}

export default useViewManufactures;
