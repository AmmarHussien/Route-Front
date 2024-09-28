import RatingHeader from "../RatingHeader";
import Pagination from "../../../ui/Pagination";
import RatingsRow from "./RatingsRow";
import Table from "../../../ui/Table";
import { useState } from "react";
import TotalRatingFilter from "./TotalRatingFilter";
import useTotalRating from "./useTotalRating";
import { format } from "date-fns/format";
import Spinner from "../../../ui/Spinner";

// const StyledBody = styled.section`
//   margin: 0.4rem 0;
// `;

function TotalRating() {
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
    return <div>Error loading rating</div>;
  }

  return (
    <>
      <RatingHeader
        title={"Total Ratings"}
        subtitle={"Indication for top ratings users and drivers"}
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
