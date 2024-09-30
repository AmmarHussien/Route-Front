import { useQuery } from "@tanstack/react-query";
import { getModel } from "../../../services/Customization/apiModels";
import { useParams } from "react-router-dom";

function useModel(modelId) {
  const { Id } = useParams();
  const {
    isLoading: modelLoading,
    data: models, // Renamed from `model` to `models` for clarity
    error,
  } = useQuery({
    queryKey: ["models", modelId],
    queryFn: () => getModel(Id, modelId),
    enabled: !!modelId, // Only fetch if brandId is not null or undefined
    retry: false,
  });

  return { modelLoading, models, error }; // Return `models` instead of `model`
}

export default useModel;
