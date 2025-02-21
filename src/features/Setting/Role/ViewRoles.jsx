import Spinner from "../../../ui/Spinner";
import RolesInformationTable from "./RolesInformationTable";
import useViewRole from "./useViewRole";

function ViewRoles({ data }) {
  const { isLoading } = useViewRole(data.id);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <RolesInformationTable
        data={data}
        title={data.name}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ViewRoles;
