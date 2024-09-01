import styled, { css } from "styled-components";

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 327px;
  height: 56px;
  padding: 8px 16px 8px 16px;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid var(--color-grey-300);
  opacity: 0px;
  background: #f7f8fa;

  ${(props) => props.type === "file" && css``}
`;

export default Input;
