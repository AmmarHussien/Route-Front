import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewNotes } from "../../../services/apiNotes";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useRideNotes() {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  const { mutate: addNote, isLoading: isAdded } = useMutation({
    mutationFn: ({ userId, note, type }) =>
      addNewNotes((userId = Id), note, (type = "ride")),
    onSuccess: () => {
      toast.success("New Note successfully created");
      queryClient.invalidateQueries({ queryKey: ["RideInfo", Id] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdded, addNote };
}
