import styled from "styled-components";

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledTitle = styled.p`
  //styleName: subhead/Subhead Regular;

  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: ${(props) => props.color || "gray"};
`;

const StyledNum = styled.p`
  //styleName: Hero/H4 Bold;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

function StatisticsItem({ icon, title, statistics, color }) {
  return (
    <StyledItem>
      <img id={icon} src={icon} alt={icon} />
      <StyledTitle color={color}>{title}</StyledTitle>
      <StyledNum>{statistics}</StyledNum>
    </StyledItem>
  );
}

export default StatisticsItem;
