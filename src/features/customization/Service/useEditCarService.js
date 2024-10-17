import { useParams } from "react-router-dom";
import { editCar } from "../../../services/Customization/apiCarService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useEditCarService(carId) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const queryClient = useQueryClient();
  const { serviceId } = useParams();

  const mutation = useMutation({
    mutationFn: ({
      arabicName,
      englishName,
      driverCommission,
      openingPrice,
      separationKm,
      beforeSeparationPrice,
      afterSeparationPrice,
      inOutSeparationKm,
    }) =>
      editCar(
        serviceId,
        carId,
        arabicName,
        englishName,
        driverCommission,
        openingPrice,
        separationKm,
        beforeSeparationPrice,
        afterSeparationPrice,
        inOutSeparationKm
      ),
    onSuccess: () => {
      toast.success(t("useEditCarServiceValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Car-Services", carId, isRTL],
      });
    },
    onError: (err) => toast.error(t("useEditCarServiceValidations.Error")),
  });

  return {
    isLoading: mutation.isLoading,
    editCarService: mutation.mutate,
    error: mutation.error,
  };
}

export default useEditCarService;
