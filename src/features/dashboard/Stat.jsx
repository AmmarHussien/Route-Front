import styled from "styled-components";

const StyledStat = styled.div`
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
  width: 360px;
  height: 141px;
  padding: 8px 16px 8px 16px;
  gap: 0px;

  border-radius: 24px;

  justify-content: space-between;
  opacity: 0px;
  border-radius: 33.6px;
  background: ${(props) => props.color};
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 328px;
  height: 89px;
  gap: 24px;
  opacity: 0px;
  padding: 16px, 16px, 16px, 16px;
  margin: 16px;
`;

const StyledText = styled.div`
  gap: 16px;
`;

function hexToRgba(hex, opacity) {
  if (!hex || (hex.length !== 4 && hex.length !== 7)) {
    console.error("Invalid hex color:", hex);
    return `rgba(0, 0, 0, ${opacity})`; // Return a default color in case of invalid input
  }

  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const Icon = styled.div`
  width: 56px;
  height: 56px;
  padding: 11.2px;
  gap: 11.2px;
  opacity: 0px;
  border-radius: 24px;

  background: ${(props) => hexToRgba(props.color, 0.7)};

  & svg {
    width: 33.6px;
    height: 33.6px;
    color: white;
  }
`;

const Value = styled.h5`
  //styleName: Hero/H0 Bold;
  font-family: Noto Sans Display;
  font-size: 33px;
  font-weight: 700;
  line-height: 40px;
  text-align: left;
  color: white;
`;

const Title = styled.p`
  //styleName: Hero/H1 Regular;
  font-family: Noto Sans Display;
  font-size: 27px;
  font-weight: 400;
  line-height: 33px;
  text-align: left;
  color: white;
`;

function Stat({ icon, title, value, backgroundColor, colorIconBackground }) {
  return (
    <StyledStat color={backgroundColor}>
      <StyledContent>
        <Icon color={colorIconBackground}>{icon}</Icon>
        <StyledText>
          <Value>{value}</Value>
          <Title>{title}</Title>
        </StyledText>
      </StyledContent>
    </StyledStat>
  );
}

export default Stat;
