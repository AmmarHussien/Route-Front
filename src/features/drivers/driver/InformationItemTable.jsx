import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import Button from "../../../ui/Button";
import { useParams } from "react-router-dom";
import usePaySite from "./usePaySite";

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

const Values = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;

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

function InformationItemTable({ title, data }) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { userId } = useParams(); // Extract userId from the URL
  const { paySite } = usePaySite();

  if (!data === null) return <Empty>{t("NoData")}</Empty>;

  function handleClick() {
    paySite(userId, isRTL); // This will only execute on click now
  }

  return (
    <TableContainer>
      <Title>{title}</Title>
      <Table>
        {Object.entries(data).map(([key, value], index) => (
          <RowItem key={key} $even={index % 2 === 1}>
            <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
            {key === "Total Site Commission" ||
            key === "إجمالي عمولة الموقع" ? (
              value[0] === 0 ? (
                <Value lang={isRTL ? "ar-Eg" : "en-US"}> {value} </Value>
              ) : (
                <Values lang={isRTL ? "ar-Eg" : "en-US"}>
                  {value}
                  <Button onClick={handleClick}>{t("Paid")}</Button>
                </Values>
              )
            ) : value === null ? (
              <Value lang={isRTL ? "ar-Eg" : "en-US"}> 0 </Value>
            ) : (
              <Value lang={isRTL ? "ar-Eg" : "en-US"}> {value} </Value>
            )}
          </RowItem>
        ))}
      </Table>
    </TableContainer>
  );
}

export default InformationItemTable;
