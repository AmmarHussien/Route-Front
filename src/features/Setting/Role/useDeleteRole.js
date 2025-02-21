import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteRole } from "../../../services/Setting/apiRole";

function useDeleteRole(id) {
  const { t } = useTranslation();
  const queryClient = useQueryClient(); // To manage query cache
  const navigate = useNavigate();

  return useMutation(
    () => deleteRole(id), // The mutation function only needs to call deleteManufacture with Id
    {
      onSuccess: () => {
        // Invalidate the query to refresh the manufactures list after deletion
        queryClient.invalidateQueries(["Setting-Roles"]);
        toast.success(t("useDeleteRoleValidations.Successfully"));

        navigate("/setting");
      },
      onError: (error) => {
        toast.error(t("useDeleteRoleValidations.Error"));
      },
    }
  );
}

export default useDeleteRole;
