import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewNotes } from "../../../services/apiNotes";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useDriverNotes() {
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const { mutate: addNote, isLoading: isAdded } = useMutation({
    mutationFn: ({ Id, note, type }) =>
      addNewNotes(userId, note, (type = "driver")),
    onSuccess: () => {
      toast.success("New Note successfully created");
      queryClient.invalidateQueries({ queryKey: ["DriverInfo", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdded, addNote };
}
