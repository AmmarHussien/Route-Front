import styled from "styled-components";

const Textarea = styled.textarea`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid var(--color-grey-300);
  background: #f7f8fa;
  box-shadow: var(--shadow-sm);
  width: 327px;
  min-height: 56px;
  height: auto;
  resize: vertical;
  overflow-y: auto;
`;

export default Textarea;
