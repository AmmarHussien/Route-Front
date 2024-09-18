import Heading from "../../ui/Heading";
import { useEffect } from "react";
import styled from "styled-components";

const RatingHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
  top: 24px;
  left: 16px;
  margin-bottom: 5px;
`;

const RatingHeaderContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RatingHeaderContainerRight = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

function RatingHeader({ currentMonth, setCurrentMonth, title, suptitle }) {
  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);

      // Get the current date
      const currentDate = new Date();

      // If the new month is greater than the current month, do not update
      if (newMonth > currentDate) {
        return prevMonth; // Return the previous month, no update
      }

      return newMonth;
    });
  };
  const monthName = currentMonth?.toLocaleString("default", {
    month: "short",
    // year: "numeric",
  });

  useEffect(() => {}, [currentMonth]);

  return (
    <>
      <RatingHeaderContainer>
        <RatingHeaderContainerLeft>
          <Heading variant="h6">{title}</Heading>
          <Heading variant="h5">{suptitle}</Heading>
        </RatingHeaderContainerLeft>

        <RatingHeaderContainerRight>
          <img
            id="ArrowLeft"
            src="/ArrowLeft.svg"
            alt="ArrowLeft"
            style={{ cursor: "pointer" }}
            onClick={handlePrevMonth}
          />

          <Heading as="h4"> {monthName} </Heading>

          <img
            id="ArrowRight"
            src="/ArrowRight.svg"
            alt="ArrowRight"
            style={{ cursor: "pointer" }}
            onClick={handleNextMonth}
          />
        </RatingHeaderContainerRight>
      </RatingHeaderContainer>
    </>
  );
}

export default RatingHeader;
