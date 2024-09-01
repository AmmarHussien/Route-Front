import styled from "styled-components";
//import { UseDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  //const { isDarkMode } = UseDarkMode();

  //const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  const src = "/Logo.svg";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
