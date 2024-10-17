import { useParams } from "react-router-dom";
import { createCar } from "../../../services/Customization/apiCarService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useCreateCarService() {
  const { t } = useTranslation();

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
      createCar(
        serviceId,
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
      toast.success(t("useCreateCarServiceValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Car-Services", serviceId],
      });
    },
    onError: (err) => toast.error(t("useCreateCarServiceValidations.Error")),
  });

  return {
    isLoading: mutation.isLoading,
    createCarService: mutation.mutate,
    error: mutation.error,
  };
}

export default useCreateCarService;
