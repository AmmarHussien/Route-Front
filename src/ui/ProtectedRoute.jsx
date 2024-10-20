import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated user
  const token = localStorage.getItem("authToken");

  let isAuthenticated = true;
  let isLoading;

  if (token === null) {
    isAuthenticated = false;
    isLoading = true;
  }
  // 2. if there is no authenticated user , redirect to the login page

  useEffect(() => {
    if (!isAuthenticated) navigate("/adminPanel/login");
  }, [isAuthenticated, navigate]);

  // 3. while loading, show spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. if there is a user , render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
