import styled from "styled-components";
import Row from "../../../ui/Row";
import Spinner from "../../../ui/Spinner";
import useGetOrganizations from "./useGetOrganizations";
import ViewOrganizationModel from "./ViewOrganizationModel";
import Heading from "../../../ui/Heading";
import AddOrganization from "./AddOrganization";
import { useTranslation } from "react-i18next";
import Empty from "../../../ui/Empty";

const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function OrganizationLayout() {
  const { getOrganizations, isLoading } = useGetOrganizations();
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">{t("Organizations")}</Heading>
        </Row>
        <AddOrganization />
      </Row>
      <Row type="horizontal">
        <BoxModels>
          {Array.isArray(getOrganizations) && getOrganizations.length > 0 ? (
            getOrganizations.map((getOrganizations, index) => (
              <ViewOrganizationModel id={getOrganizations.id} key={index} />
            ))
          ) : (
            <Empty>{"NoData"}</Empty> // You can add a fallback message or placeholder here
          )}
        </BoxModels>
      </Row>
    </div>
  );
}

export default OrganizationLayout;
