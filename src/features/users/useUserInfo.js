import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/apiUsers";
import { useTranslation } from "react-i18next";

function useUser() {
  const { Id } = useParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const {
    isLoading,
    data: userInfo,
    error,
  } = useQuery({
    queryKey: ["userInfo", Id, isRTL],
    queryFn: () => getUser(Id, isRTL),
    retry: false,
  });
  return { isLoading, userInfo, error };
}

export default useUser;
