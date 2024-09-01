import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewNotes } from "../../../services/apiNotes";
import toast from "react-hot-toast";

export function useNotes() {
  const queryClient = useQueryClient();

  const { mutate: addNote, isLoading: isAdded } = useMutation({
    mutationFn: ({ userId, note }) => addNewNotes(userId, note),
    onSuccess: () => {
      toast.success("New Note successfully created");
      queryClient.invalidateQueries({ queryKey: ["New Notes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdded, addNote };
}
