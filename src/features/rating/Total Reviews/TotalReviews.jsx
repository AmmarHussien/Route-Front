import { useState } from "react";
import RatingHeader from "../RatingHeader";

function TotalReviews() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  return (
    <>
      <RatingHeader
        title={"Total Reviews"}
        suptitle={"Indication for the total Reviews over this month"}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </>
  );
}

export default TotalReviews;
