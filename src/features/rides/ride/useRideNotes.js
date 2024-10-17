import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewNotes } from "../../../services/apiNotes";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function useRideNotes() {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t } = useTranslation();

  const { mutate: addNote, isLoading: isAdded } = useMutation({
    mutationFn: ({ userId, note, type }) =>
      addNewNotes((userId = Id), note, (type = "ride")),
    onSuccess: () => {
      toast.success(t("useRideNotesValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["RideInfo", Id] });
    },
    onError: (err) => toast.error(t("useRideNotesValidations.Successfully")),
  });

  return { isAdded, addNote };
}
