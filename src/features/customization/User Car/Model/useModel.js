import { useQuery } from "@tanstack/react-query";
import { getAllModels } from "../../../../services/Customization/apiModels";
import { useParams } from "react-router-dom";

function useModel() {
  const { Id } = useParams();
  const {
    isLoading: modelLoading,
    data: models, // Renamed from `model` to `models` for clarity
    error,
  } = useQuery({
    queryKey: ["Customization-Models", Id],
    queryFn: () => getAllModels(Id),
    enabled: !!Id, // Only fetch if brandId is not null or undefined
    retry: false,
  });

  return { modelLoading, models, error }; // Return `models` instead of `model`
}

export default useModel;
