import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteManufacture } from "../../../../services/Customization/apiManufactures";
import toast from "react-hot-toast";

function useDeleteManufactures() {
  const { Id } = useParams(); // Get the Id from URL params
  const queryClient = useQueryClient(); // To manage query cache
  const navigate = useNavigate();

  return useMutation(
    () => deleteManufacture(Id), // The mutation function only needs to call deleteManufacture with Id
    {
      onSuccess: () => {
        // Invalidate the query to refresh the manufactures list after deletion
        queryClient.invalidateQueries(["Customization-Manufactures"]);
        navigate("/adminPanel/customization/userCar");
      },
      onError: (error) => {
        toast.error(`Error deleting manufacture: ${error.message}`);
      },
    }
  );
}

export default useDeleteManufactures;
