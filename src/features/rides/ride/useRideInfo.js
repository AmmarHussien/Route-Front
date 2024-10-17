import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRide } from "../../../services/apiRides";
import { useTranslation } from "react-i18next";

function useRideInfo() {
  const { Id } = useParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const {
    isLoading,
    data: rideInfo,
    error,
  } = useQuery({
    queryKey: ["RideInfo", Id],
    queryFn: () => getRide(Id, isRTL),
    retry: false,
  });
  return { isLoading, rideInfo, error };
}

export default useRideInfo;
