import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: 16px;
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  width: fit-content;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: #005379;
      color: var(--color-brand-50);
    `}

  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px 8px 16px;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: #41a8d7;
    color: var(--color-brand-50);
  }
`;

const Filter = styled.div`
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  height: 5rem;
  margin-right: 10px;
`;

function CustomizationMainFilter({ currentFilter, setCurrentFilter }) {
  function handleClick(value) {
    setCurrentFilter(value);
  }
  return (
    <StyledFilter>
      <Filter>
        <FilterButton
          onClick={() => handleClick("Services")}
          $active={"Services" === currentFilter}
          disabled={"Services" === currentFilter}
        >
          Services
        </FilterButton>
        <FilterButton
          onClick={() => handleClick("Organization")}
          $active={"Organization" === currentFilter}
          disabled={"Organization" === currentFilter}
        >
          Organization
        </FilterButton>

        <FilterButton
          onClick={() => handleClick("DriverCar")}
          $active={"DriverCar" === currentFilter}
          disabled={"DriverCar" === currentFilter}
        >
          Driver Car
        </FilterButton>
        <FilterButton
          onClick={() => handleClick("UserCar")}
          $active={"UserCar" === currentFilter}
          disabled={"UserCar" === currentFilter}
        >
          User Car
        </FilterButton>
      </Filter>
    </StyledFilter>
  );
}

export default CustomizationMainFilter;
