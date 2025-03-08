import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCar } from "../../../services/Customization/apiCarService";
import { useTranslation } from "react-i18next";

function useDeleteCar(carId) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { serviceId } = useParams();

  return useMutation(() => deleteCar(serviceId, carId), {
    onSuccess: () => {
      // Invalidate the query to refresh the manufactures list after deletion
      toast.success(t("useDeleteCarServiceValidations.Successfully"));

      queryClient.invalidateQueries(["Customization-Car-Services", serviceId]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });
}

export default useDeleteCar;
