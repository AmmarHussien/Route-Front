import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./stats";

import RidesStatistics from "./Statistics";
import RecentRide from "./ResentRide.jsx/RecentRide";
import useStatistics from "./useStatisctics";
import SalesChart from "./SalesChart";
const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: row;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

function DashboardLayout() {
  const { statistics, isLoading } = useStatistics();

  if (isLoading) return <Spinner />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats
          totalUser={statistics.totalUsersCount}
          totalDrivers={statistics.totalDriversCount}
          totalVehicles={statistics.totalVehiclesCount}
        />
      </StyledDashboardLayout>
      <SmallContainer>
        <SalesChart />
        <RidesStatistics />
      </SmallContainer>
      <RecentRide />
    </>
  );
}

export default DashboardLayout;
