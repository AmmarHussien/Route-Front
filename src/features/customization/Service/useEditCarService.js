import { useParams } from "react-router-dom";
import { editCar } from "../../../services/Customization/apiCarService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditCarService(carId) {
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
      toast.success("Car Services successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Car-Services", carId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isLoading: mutation.isLoading,
    editCarService: mutation.mutate,
    error: mutation.error,
  };
}

export default useEditCarService;
