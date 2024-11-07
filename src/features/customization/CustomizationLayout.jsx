import { CardContent, CardMedia } from "@mui/material";
import styled from "styled-components";

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Ensures cards wrap if needed */
  min-height: 80vh; /* Makes sure the grid takes the full height of the viewport */
  gap: 16px; /* Space between cards */
  margin: 0 auto; /* Centers the grid horizontally */
  padding: 20px; /* Optional padding inside the grid */
`;

function CustomizationLayout() {
  return (
    <CardGrid>
      <CardContent key={1} sx={{ marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="340"
          width="340"
          image="/Header1.svg"
          alt={"Header1"}
          key={"Header1"}
          id={"Header1"}
        />
      </CardContent>
      <CardContent key={2} sx={{ marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image="/Header2.svg"
          alt={"Header2"}
          key={"Header2"}
          id={"Header2"}
        />
      </CardContent>
      <CardContent key={3} sx={{ marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image="/Header3.svg"
          alt={"Header3"}
          key={"Header3"}
          id={"Header3"}
        />
      </CardContent>
    </CardGrid>
  );
}

export default CustomizationLayout;
