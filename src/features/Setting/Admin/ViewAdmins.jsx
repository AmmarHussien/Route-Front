import useViewAdmin from "./useViewAdmin";
import Spinner from "../../../ui/Spinner";
import AdminInformationTable from "./AdminInformationTable";

function ViewAdmins({ data }) {
  const { isLoading } = useViewAdmin(data.id);

  if (isLoading) return <Spinner />;

  return (
    <AdminInformationTable
      data={data}
      title={data.name}
      isLoading={isLoading}
    />
  );
}

export default ViewAdmins;
