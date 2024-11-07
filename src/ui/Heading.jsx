import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.$variant === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      //text-align: center;
    `}
  ${(props) =>
    props.$variant === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    `}
  ${(props) =>
    props.$variant === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      text-align: center;
      margin-bottom: 50px;
    `}
  ${(props) =>
    props.$variant === "h4" &&
    css`
      font-size: 1.6rem;
      font-weight: 200;
      text-align: center;
    `}
  ${(props) =>
    props.$variant === "loginPageHeader" &&
    css`
      font-size: 33px;
      font-weight: 700;
      text-align: center;
      color: #272424;
      line-height: 30px;
    `}
  ${(props) =>
    props.$variant === "loginPageSlogan" &&
    css`
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      color: #72788b;
      line-height: 24px;
    `}
  ${(props) =>
    props.$variant === "h5" &&
    css`
      font-size: 12px;
      font-weight: 400;
      color: #72788b;
      line-height: 16px;
    `}
  ${(props) =>
    props.$variant === "h6" &&
    css`
      font-size: 15px;
      font-weight: 700;
      color: #272424;
      line-height: 21px;
    `}
  ${(props) =>
    props.$variant === "customHeading" &&
    css`
      font-size: 20.57px;
      font-weight: 700;
      line-height: 28.8px;
      text-align: right;
    `}
  ${(props) =>
    props.$variant === "statisticsItemText" &&
    css`
      font-size: 15px;
      font-weight: 700;
      line-height: 21px;
      text-align: center;
    `}
  ${(props) =>
    props.$variant === "statisticsItemNum" &&
    css`
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      text-align: left;
    `}
`;

export default Heading;
