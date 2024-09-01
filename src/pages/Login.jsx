import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import LoginLogo from "../features/authentication/LoginLogo";

const Container = styled.div`
  display: flex;
`;

const LoginLayoutLeft = styled.main`
  flex: 1;
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  grid-template-columns: 48rem;
  justify-content: center;

  width: Hug (375px) px;
  height: Hug (463px) px;
  padding: 24px 0px 0px 0px;
  gap: 48px;
  border-radius: 24px;
  opacity: 0px;

  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 15px 0px rgba(39, 36, 36, 0.08);
`;
const LoginLayoutRight = styled.main`
  flex: 1;
  display: grid;
  justify-content: center;
  align-content: center;
  min-height: 100vh;

  gap: 3.2rem;

  background: linear-gradient(155.81deg, #005379 5.42%, #f5a201 158.28%);
`;

function Login() {
  return (
    <>
      <Container>
        <LoginLayoutLeft>
          <LoginForm />
        </LoginLayoutLeft>
        <LoginLayoutRight>
          <LoginLogo />
        </LoginLayoutRight>
      </Container>
    </>
  );
}

export default Login;
