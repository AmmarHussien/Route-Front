import styled from "styled-components";

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.p`
  //styleName: subhead/Subhead Regular;
  font-family: Noto Sans Display;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: ${(props) => props.color || "gray"};
`;

const StyledNum = styled.p`
  //styleName: Hero/H4 Bold;
  font-family: Noto Sans Display;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

function StatistecsItem({ icon, title, statistecs, color }) {
  return (
    <StyledItem>
      {icon}
      <StyledTitle color={color}>{title}</StyledTitle>
      <StyledNum>{statistecs}</StyledNum>
    </StyledItem>
  );
}

export default StatistecsItem;
