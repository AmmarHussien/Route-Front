import { useParams } from "react-router-dom";
import { createCar } from "../../../services/Customization/apiCarService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateCarService() {
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
      toast.success("Car Services successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Car-Services", serviceId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isLoading: mutation.isLoading,
    createCarService: mutation.mutate,
    error: mutation.error,
  };
}

export default useCreateCarService;
