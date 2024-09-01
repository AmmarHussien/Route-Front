import { useQuery } from "@tanstack/react-query";
import { getModels } from "../../services/apiModel";

function useModel(brandId) {
  const {
    isLoading: modelLoading,
    data: models, // Renamed from `model` to `models` for clarity
    error,
  } = useQuery({
    queryKey: ["models", brandId],
    queryFn: () => getModels(brandId),
    enabled: !!brandId, // Only fetch if brandId is not null or undefined
    retry: false,
  });

  // Optional: Add console logs for debugging or remove in production

  return { modelLoading, models, error }; // Return `models` instead of `model`
}

export default useModel;
