import { useTranslation } from "react-i18next";
import Spinner from "../../../ui/Spinner";
import InformationOrganizationTable from "./InformationOrganizationTable";
import useViewOrganization from "./useViewOrganization";

function ViewOrganizationModel({ id }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { viewOrganizations, isLoading } = useViewOrganization(id);

  if (isLoading) return <Spinner />;

  const { id: viewId } = viewOrganizations;

  // const { id: viewId } = viewOrganizations;

  return (
    <InformationOrganizationTable
      data={viewId}
      title={
        isRTL
          ? `${viewOrganizations.name.ar} `
          : `${viewOrganizations.name.en} `
      }
    />
  );
}

export default ViewOrganizationModel;
