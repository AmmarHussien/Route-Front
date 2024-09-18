import styled, { css } from "styled-components";

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: 24px;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px 8px 16px;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const Filter = styled.div`
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  height: 5rem;
`;
function TotalRatingFilter({ currentFilter, setCurrentFilter }) {
  function handleClick(value) {
    setCurrentFilter(value);
  }
  return (
    <Filter>
      <FilterButton
        onClick={() => handleClick("Drivers")}
        $active={"Drivers" === currentFilter}
        disabled={"Drivers" === currentFilter}
      >
        Drivers Ratings
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("Users")}
        $active={"Users" === currentFilter}
        disabled={"Users" === currentFilter}
      >
        Users Ratings
      </FilterButton>
    </Filter>
  );
}

export default TotalRatingFilter;
