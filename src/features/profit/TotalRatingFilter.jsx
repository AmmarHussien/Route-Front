import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: #005379;
      color: var(--color-brand-50);
    `}

  border-radius: 24px;
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
function FilterType({ currentFilter, setCurrentFilter }) {
  function handleClick(value) {
    setCurrentFilter(value);
  }
  const { t } = useTranslation();

  return (
    <Filter>
      <FilterButton
        onClick={() => handleClick("Admin")}
        $active={"Admin" === currentFilter}
        disabled={"Admin" === currentFilter}
      >
        {t("AdminPaymentReport")}
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("Driver")}
        $active={"Driver" === currentFilter}
        disabled={"Driver" === currentFilter}
      >
        {t("DriverPaymentReport")}
      </FilterButton>
    </Filter>
  );
}

export default FilterType;
