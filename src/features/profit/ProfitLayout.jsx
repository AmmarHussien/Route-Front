import { useState } from "react";
import ProfitStatisctics from "./Profit Statisctics/ProfitStatisctics";
import ProfitTableOperations from "./ProfitTableOperations";
import ProfitTable from "./Admin Table/AdminProfitTable";
import useAdminProfit from "./Admin Table/useAdminProfit";
import FilterType from "./TotalRatingFilter";
import styled from "styled-components";
import useAdminSearchProfit from "./Admin Table/useAdminSearchProfit";
import DriverProfitTable from "./Driver Table/DriverProfitTable";
import useDriverSearchProfit from "./Driver Table/useDriverSearchProfit";
import useDriverProfit from "./Driver Table/useDriverProfit";

const ProfitOperationsContainer = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  background-color: white;
  border-radius: 24px;
  padding: 16px;
`;

function ProfitLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("Admin");

  const { searchAdminList, count: searchAdminCount } =
    useAdminSearchProfit(searchTerm);

  const {
    isLoading: adminLoading,
    adminProfit,
    count: adminCount,
  } = useAdminProfit();

  const { searchDriverList, count: searchDriverCount } =
    useDriverSearchProfit(searchTerm);

  const {
    isLoading: driverLoading,
    driverProfit,
    count: driverCount,
  } = useDriverProfit();

  const adminProfitToDisplay = searchTerm ? searchAdminList : adminProfit;
  const adminCountToDisplay = searchTerm ? searchAdminCount : adminCount;

  const driverProfitToDisplay = searchTerm ? searchDriverList : driverProfit;
  const driverCountToDisplay = searchTerm ? searchDriverCount : driverCount;

  return (
    <>
      <ProfitStatisctics />
      <ProfitOperationsContainer>
        <FilterType
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        <ProfitTableOperations
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </ProfitOperationsContainer>

      {currentFilter === "Admin" ? (
        <ProfitTable
          profit={adminProfitToDisplay}
          isLoading={adminLoading}
          profitCount={adminCountToDisplay}
        />
      ) : (
        <DriverProfitTable
          profit={driverProfitToDisplay}
          isLoading={driverLoading}
          profitCount={driverCountToDisplay}
        />
      )}
    </>
  );
}

export default ProfitLayout;
