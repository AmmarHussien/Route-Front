import { useQuery } from "@tanstack/react-query";
import { getModels } from "../../services/apiModel";
import { useTranslation } from "react-i18next";

function useModel(brandId) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const {
    isLoading: modelLoading,
    data: models, // Renamed from `model` to `models` for clarity
    error,
  } = useQuery({
    queryKey: ["models", brandId, isRTL],
    queryFn: () => getModels(brandId, isRTL),
    enabled: !!brandId, // Only fetch if brandId is not null or undefined
    retry: false,
  });

  // Optional: Add console logs for debugging or remove in production

  return { modelLoading, models, error }; // Return `models` instead of `model`
}

export default useModel;
