import RatingHeader from "../RatingHeader";
import Pagination from "../../../ui/Pagination";
import RatingsRow from "./RatingsRow";
import Table from "../../../ui/Table";
import { useState } from "react";
import TotalRatingFilter from "./TotalRatingFilter";
import useTotalRating from "./useTotalRating";
import { format } from "date-fns/format";
import Spinner from "../../../ui/Spinner";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// const StyledBody = styled.section`
//   margin: 0.4rem 0;
// `;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

function TotalRating() {
  const { t } = useTranslation();

  const [currentFilter, setCurrentFilter] = useState("Drivers");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { isLoading, error, totalRatings } = useTotalRating(
    currentFilter.toLowerCase(),
    format(currentMonth, "yyyy"),
    format(currentMonth, "M")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage>{t("ErrorLoading")}</ErrorMessage>;
  }

  return (
    <>
      <RatingHeader
        title={t("TotalRatings")}
        subtitle={t("TotalRatingSlogan")}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <TotalRatingFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <Table.Body
        data={totalRatings}
        render={(rating) => (
          <RatingsRow RowItem={rating} isLoading={isLoading} key={rating.id} />
        )}
      />

      <Pagination count={totalRatings.length} />
    </>
  );
}

export default TotalRating;
