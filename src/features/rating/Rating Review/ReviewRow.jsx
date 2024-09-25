import styled from "styled-components";

const CommonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: none;
  gap: 40px;
`;

const Row = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
`;

const RowLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Color = styled.div`
  border-radius: 50%; /* Makes the element circular */
  width: 10px; /* Size for visibility */
  height: 10px;
  background-color: ${(props) => props.color};
`;

function ReviewRow({ color, reviews, rate, maxLength }) {
  return (
    <Row>
      <RowLeft>
        {color.slice(0, maxLength).map((element, index) => (
          <RowItem key={index}>
            <Color color={element} />
            <div>{`${reviews[index]?.rate} Star` || "-"}</div>
          </RowItem>
        ))}
      </RowLeft>
      <RowRight>
        {reviews.slice(0, maxLength).map((review, index) => (
          <RowItem key={index}>
            <div>{review.percentage.toFixed(2)}%</div>
            <div>({review.total})</div>
          </RowItem>
        ))}
      </RowRight>
    </Row>
  );
}

export default ReviewRow;
