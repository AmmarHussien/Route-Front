import styled from "styled-components";
import Row from "../../../ui/Row";
import useGetRole from "./useGetRole";
import ViewRoles from "./ViewRoles";
import Empty from "../../../ui/Empty";
import Spinner from "../../../ui/Spinner";
import AddRole from "./AddRole";

const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function RoleLayout() {
  const { getRole, isLoading } = useGetRole();

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Row type="horizontal">
        <Row type="vertical"></Row>
        <AddRole />
      </Row>
      <Row type="horizontal">
        <Row type="vertical"></Row>
      </Row>
      <Row type="horizontal">
        <BoxModels>
          {Array.isArray(getRole) && getRole.length > 0 ? (
            getRole.map((getRole, index) => (
              <ViewRoles data={getRole} key={index} />
            ))
          ) : (
            <Empty>{"NoData"}</Empty> // You can add a fallback message or placeholder here
          )}
        </BoxModels>
      </Row>
    </div>
  );
}

export default RoleLayout;
