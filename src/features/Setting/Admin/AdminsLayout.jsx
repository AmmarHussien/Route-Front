import useGetAdmin from "./useGetAdmin";
import Spinner from "../../../ui/Spinner";
import Row from "../../../ui/Row";
import styled from "styled-components";
import Empty from "../../../ui/Empty";
import ViewAdmin from "./ViewAdmins";
import AddAdmin from "./AddAdminButton";
import Permission from "../../../ui/permission";

const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function AdminLayout() {
  const { isLoading, getAdmin } = useGetAdmin();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Row type="horizontal">
        <Row type="vertical"></Row>
        <Permission requiredPermissions="createAdmin">
          <AddAdmin />
        </Permission>
      </Row>
      <Row type="horizontal">
        <BoxModels>
          {Array.isArray(getAdmin) && getAdmin.length > 0 ? (
            getAdmin.map((getAdmin, index) => (
              <ViewAdmin data={getAdmin} key={index} />
            ))
          ) : (
            <Empty>{"NoData"}</Empty> // You can add a fallback message or placeholder here
          )}
        </BoxModels>
      </Row>
    </div>
  );
}

export default AdminLayout;
