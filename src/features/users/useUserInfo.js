import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/apiUsers";

function useUser() {
  const { Id } = useParams();

  const {
    isLoading,
    data: userInfo,
    error,
  } = useQuery({
    queryKey: ["userInfo", Id],
    queryFn: () => getUser(Id),
    retry: false,
  });
  return { isLoading, userInfo, error };
}

export default useUser;
