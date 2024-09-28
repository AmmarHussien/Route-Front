import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRide } from "../../../services/apiRides";

function useRideInfo() {
  const { Id } = useParams();

  const {
    isLoading,
    data: rideInfo,
    error,
  } = useQuery({
    queryKey: ["RideInfo", Id],
    queryFn: () => getRide(Id),
    retry: false,
  });
  return { isLoading, rideInfo, error };
}

export default useRideInfo;
