import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { upload as uploadFile } from "../services/apiUpload";

export function useUploader() {
  const queryClient = useQueryClient();

  const { mutateAsync: upload, isLoading: isUploaded } = useMutation({
    mutationFn: (formData) => uploadFile(formData),
    onSuccess: () => {
      toast.success("New upload successfully created");
      queryClient.invalidateQueries({ queryKey: ["upload"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUploaded, upload };
}
