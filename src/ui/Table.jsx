import { createContext, useContext } from "react";
import styled from "styled-components";
import Heading from "./Heading";
import DownloadTable from "../utils/DownLoadTable";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns}; /* Updated */
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const StyledNav = styled.div`
  padding-left: 20px;
  height: 56px;
  gap: 10px;
  border-radius: 0px 0px 16px 16px;
  border: 1px 0px 0px 0px;
  background: var(--Color-Neutrals-Prim-Card, #f7f8fa);
  border-top: 1px solid var(--Color-Neutrals-Secondary-Card, #ffffff);
  display: flex;
  justify-content: space-between;
`;

const StyledNavDiv = styled.div`
  width: 327 px;
  height: 37 px;
  top: 9px;
  left: 16px;
  padding: 8px 0px 8px 0px;
  gap: 8px;
  opacity: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNavIcon = styled.div`
  width: 137px;
  height: 24px;
  top: 40px;
  left: 952px;
  padding: 0px 16px 0px 0px;
  gap: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function TableNaView({ title, subtitle }) {
  return (
    <StyledNav>
      <StyledNavDiv>
        <Heading $variant="h6">{title}</Heading>
        <Heading $variant="h5">{subtitle}</Heading>
      </StyledNavDiv>
    </StyledNav>
  );
}

function TableNav({ title, tableData }) {
  return (
    <StyledNav>
      <StyledNavDiv>
        <Heading $variant="h6">{title}</Heading>
      </StyledNavDiv>
      <StyledNavDiv>
        <StyledNavIcon>
          <DownloadTable tableData={tableData} title={title} />
        </StyledNavIcon>
      </StyledNavDiv>
    </StyledNav>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {" "}
      {/* Updated */}
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {" "}
      {/* Updated */}
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data?.length) return <Empty>No data to show at this moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.TableNav = TableNav;
Table.TableNaView = TableNaView;

export default Table;
