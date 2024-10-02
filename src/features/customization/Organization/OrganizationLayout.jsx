import styled from "styled-components";
import Row from "../../../ui/Row";
import Spinner from "../../../ui/Spinner";
import useGetOrganizations from "./useGetOrganizations";
import ViewOrganizationModel from "./ViewOrganizationModel";
import Heading from "../../../ui/Heading";
import AddOrganization from "./AddOrganization";

const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function OrganizationLayout() {
  const { getOrganizations, isLoading } = useGetOrganizations();

  if (isLoading) return <Spinner />;

  console.log(getOrganizations);
  return (
    <div>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">Organizations</Heading>
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
            <p>No models found.</p> // You can add a fallback message or placeholder here
          )}
        </BoxModels>
      </Row>
    </div>
  );
}

export default OrganizationLayout;
