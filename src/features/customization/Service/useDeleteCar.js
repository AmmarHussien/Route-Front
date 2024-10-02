import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCar } from "../../../services/Customization/apiCarService";

function useDeleteCar(carId) {
  const queryClient = useQueryClient();
  const { serviceId } = useParams();

  return useMutation(() => deleteCar(serviceId, carId), {
    onSuccess: () => {
      // Invalidate the query to refresh the manufactures list after deletion

      queryClient.invalidateQueries(["Customization-Car-Services", serviceId]);
    },
    onError: (error) => {
      toast.error("Error deleting manufacture:", error.message);
    },
  });
}

export default useDeleteCar;
