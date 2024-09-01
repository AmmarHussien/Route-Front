import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { editDriver } from "../../../services/apiDriver";

function useEditDriver() {
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const { mutate: editDrivers, isLoading: isEditing } = useMutation({
    mutationFn: (newDriverData) => editDriver(userId, newDriverData), // Ensure parameters match
    onSuccess: () => {
      toast.success("Driver successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["DriverInfo", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editDrivers, isEditing };
}

export default useEditDriver;
