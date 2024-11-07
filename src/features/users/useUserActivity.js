import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function useUserActivity() {
  const { Id } = useParams();

  console.log(Id);

  const {
    isLoading,
    data: userActivity,
    error,
  } = useQuery({
    queryKey: ["userActivity", Id],
    //queryFn: () => getUserActivity(Id),
    retry: false,
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });
  return { isLoading, userActivity, error };
}

export default useUserActivity;
