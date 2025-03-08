import styled, { css } from "styled-components";
import Row from "../../../ui/Row";

import Spinner from "../../../ui/Spinner";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import usePermissions from "../../../hooks/usePermissions";

const TableContainer = styled.div`
  width: 100%;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: fit-content;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;
const RowItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.$even ? "#f1f1f1" : "#f9f9f9")};
`;
const Label = styled.div`
  flex: 1;
  font-weight: 700px;
  text-transform: capitalize;
  color: #72788e;
`;

const Value = styled.div`
  flex: 1;
  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      text-align: right;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      text-align: left;
    `}
  font-weight: 600px;
  color: #272424;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function AdminInformationTable({ title, data, isLoading }) {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { hasPermission } = usePermissions();

  if (!data) return <Empty>{t("NoData")}</Empty>;

  const requiredPermission = "viewAdmin";

  function handleClick(id) {
    if (hasPermission(requiredPermission)) {
      navigate(`/setting/admin/admin-information/${id}`);
    }
  }

  const dataAdmin = {
    [t("AdminId")]: data.id,
    [t("Name")]: data.name,
    [t("Status")]: data.status,
  };

  // Check if the user has permission
  const hasAccess = hasPermission(requiredPermission);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <TableContainer>
        <Row type={"horizontal"}>
          <Title>{title}</Title>
        </Row>

        <Table
          onClick={hasAccess ? () => handleClick(data.id) : undefined} // Disable onClick if no permission
          style={{ cursor: hasAccess ? "pointer" : "not-allowed" }} // Change cursor style based on permission
        >
          {Object.entries(dataAdmin).map(([key, value], index) => (
            <RowItem key={key} $even={index % 2 === 1}>
              <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
              <Value lang={isRTL ? "ar-Eg" : "en-US"}> {value} </Value>
            </RowItem>
          ))}
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminInformationTable;
