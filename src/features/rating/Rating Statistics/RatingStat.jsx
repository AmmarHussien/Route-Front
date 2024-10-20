import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 20%;
  padding: 16px;
  border-radius: 33.6px;
  gap: 16px;
  background: ${(props) => props.color};
`;
const Icon = styled.div`
  width: 56px;
  height: 56px;
  padding: 11.2px;
  border-radius: 33.6px;
  background: ${(props) => hexToRgba(props.color, 1)};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 61px;
  gap: 8px;
`;

const Title = styled.p`
  //styleName: Hero/H1 Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  color: #72788e;
`;

const ValuesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
  gap: 4px;
`;

const Value = styled.h5`
  //styleName: Hero/H0 Bold;
  font-size: 21px;
  font-weight: 700;
  line-height: 26px;
  text-align: left;
  color: #272424;
`;

const ChangeMetric = styled.div`
  display: flex;
  flex-direction: row;

  padding: 4px;
  gap: 4px;
`;

const ChangeNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Arrow = styled.img`
  width: 16px;
  height: 16px;
`;

const NumberOfChange = styled.h5`
  //styleName: footnote and caption/Footnote Semibold;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  color: ${(props) => props.color};
`;

const MonthOfChange = styled.h5`
  //styleName: footnote and caption/Caption Regular;
  font-size: 11px;
  font-weight: 400;
  text-align: left;
`;

function hexToRgba(hex, opacity) {
  if (!hex || (hex.length !== 4 && hex.length !== 7)) {
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

function RatingStat({
  icon,
  title,
  pastMonthValue,
  thisMonthValue,
  backgroundColor,
  colorIconBackground,
}) {
  const { t } = useTranslation();

  const changeNumber =
    pastMonthValue === 0
      ? thisMonthValue
      : pastMonthValue === 0 && thisMonthValue === 0
      ? 0
      : ((thisMonthValue - pastMonthValue) / pastMonthValue) * 100;
  const formattedChangeNumber = changeNumber.toFixed(0);

  return (
    <StatContainer color={backgroundColor}>
      <Icon color={colorIconBackground}>
        <img id={icon} src={icon} alt={icon} />
      </Icon>

      <TextContainer>
        <Title>{title}</Title>
        <ValuesContainer>
          <Value>{thisMonthValue.toFixed(2)}</Value>
          <ChangeMetric>
            {changeNumber > 0 ? (
              <ChangeNumberContainer>
                <Arrow id="ArrowUp" src="/ArrowUp.svg" alt="ArrowUp" />
                <NumberOfChange color="#20C992">
                  {formattedChangeNumber}%
                </NumberOfChange>
              </ChangeNumberContainer>
            ) : changeNumber === 0 ? null : (
              <ChangeNumberContainer>
                <Arrow id="ArrowDown" src="/ArrowDown.svg" alt="ArrowDown" />
                <NumberOfChange color="#FC5555">
                  {Math.abs(formattedChangeNumber)}%
                </NumberOfChange>
              </ChangeNumberContainer>
            )}

            <MonthOfChange>{t("ThisMonth")}</MonthOfChange>
          </ChangeMetric>
        </ValuesContainer>
      </TextContainer>
    </StatContainer>
  );
}

export default RatingStat;
