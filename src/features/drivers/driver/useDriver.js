import { useQuery } from "@tanstack/react-query";
import { getDriver } from "../../../services/apiDriver";
import { useTranslation } from "react-i18next";

function useDriver(id) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const {
    isLoading,
    data: driverData = {}, // Ensure default object
    error,
  } = useQuery({
    queryKey: ["DriverInfo", id],
    queryFn: () => getDriver(id, isRTL),
  });
  return { isLoading, driverData, error };
}
export default useDriver;
