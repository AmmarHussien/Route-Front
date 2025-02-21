import useViewAdmin from "./useViewAdmin";
import Spinner from "../../../ui/Spinner";
import AdminInformationTable from "./AdminInformationTable";

function ViewAdmins({ id }) {
  const { isLoading, viewAdmin } = useViewAdmin(id);

  return isLoading ? (
    <Spinner />
  ) : (
    <AdminInformationTable
      data={viewAdmin}
      title={viewAdmin.name}
      isLoading={isLoading}
    />
  );
}

export default ViewAdmins;
