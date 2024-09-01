import styled from "styled-components";
import Heading from "../../ui/Heading";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 542px;
  height: 553px;
  border-radius: 14px;
  padding: 25px 0px;
  background: rgba(255, 255, 255, 0.79);
`;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  width: 361px;
  height: 210px;
  gap: 17px;
`;

const Image = styled.img`
  width: 60px;
  height: 61px;
`;

function LoginLogo() {
  return (
    <Box>
      <StyledFormRow>
        <Image src="/Logo.svg" alt="" />
        <Heading variant="loginPageHeader">Welcom To Route</Heading>
        <Heading variant="loginPageHeader"> Admin Panel</Heading>
        <Heading variant="h4">
          Login now to manage your account and check your pending request
        </Heading>
      </StyledFormRow>
    </Box>
  );
}

export default LoginLogo;
