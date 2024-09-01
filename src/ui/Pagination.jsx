import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(() => {
    // Initialize pageSize from searchParams or default to 5
    return Number(searchParams.get("per_page")) || 10;
  });

  // Update pageSize and query parameters
  const handlePageSizeChange = (newPerPage) => {
    setPageSize(newPerPage);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("per_page", newPerPage);
      return newParams;
    });
  };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (count < pageSize) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of <span>{count}</span> results
        <span>
          {" "}
          <label htmlFor="pageSize">Page Size: </label>{" "}
          <input
            id="pageSize"
            type="number"
            value={pageCount > 1 ? pageSize : count}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            min="1"
            style={{
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              width: "40px",
              boxSizing: "border-box",
              marginRight: "10px",
            }}
          />
        </span>
      </P>
      {pageCount > 1 ? (
        <Buttons>
          <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
            <HiChevronLeft /> <span> Previous </span>
          </PaginationButton>
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <span> Next </span> <HiChevronRight />
          </PaginationButton>
        </Buttons>
      ) : null}
    </StyledPagination>
  );
}

export default Pagination;
