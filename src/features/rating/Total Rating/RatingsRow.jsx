import styled from "styled-components";

const CommonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;
const Row = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  height: 70px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
    border-top: 1px solid var(--color-grey-100);
  }
`;

const RowLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const RowRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Image = styled.img`
  border-radius: 50%; /* Makes the image fully circular */
  width: 40px; /* Increased size for better visibility */
  height: 40px;
  object-fit: cover; /* Ensures the image maintains aspect ratio within the circle */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow for depth */
  transition: transform 0.2s ease-in-out; /* Adds a smooth hover effect */

  &:hover {
    transform: scale(1.1); /* Slightly enlarges the image on hover */
  }
`;
function RatingsRow({ RowItem }) {
  return (
    <>
      <Row role="row">
        <RowLeft>
          <Image
            id={RowItem.id}
            src={RowItem.profile_image || "/Profile.svg"}
            alt={`Image${RowItem.id}`}
          />
          <div>{RowItem.full_name}</div>
        </RowLeft>
        <RowRight>
          <div>{RowItem.total_rate.toFixed(2)}</div>
          <div>
            <img id={RowItem.id} src="/Star.svg" alt={`star${RowItem.id}`} />
          </div>
        </RowRight>
      </Row>
    </>
  );
}

export default RatingsRow;
