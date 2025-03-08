import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewNotes } from "../../../services/apiNotes";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function useDriverNotes() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { t } = useTranslation();

  const { mutate: addNote, isLoading: isAdded } = useMutation({
    mutationFn: ({ Id, note, type }) =>
      addNewNotes(userId, note, (type = "driver")),
    onSuccess: () => {
      toast.success(t("useDriverNotesValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["DriverInfo", userId] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { isAdded, addNote };
}
