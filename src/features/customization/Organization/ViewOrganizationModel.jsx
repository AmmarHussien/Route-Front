import Spinner from "../../../ui/Spinner";
import InformationOrganizationTable from "./InformationOrganizationTable";
import useViewOrganization from "./useViewOrganization";

function ViewOrganizationModel({ id }) {
  const { viewOrganizations, isLoading } = useViewOrganization(id);

  if (isLoading) return <Spinner />;

  const active = viewOrganizations.is_active === true ? "True" : "False";

  return (
    <InformationOrganizationTable
      data={{
        id: viewOrganizations.id,
        englishName: viewOrganizations.name.en,
        arabicName: viewOrganizations.name.ar,
        isActive: active,
      }}
      title={`${viewOrganizations.name.en} `}
    />
  );
}

export default ViewOrganizationModel;
