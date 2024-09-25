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
  max-height: calc(15 * 1.2em); /* Adjust 1.2em based on your line height */
  height: auto;
  resize: vertical; /* Allow vertical resizing */
  overflow-y: auto; /* Add scrollbar if content exceeds max-height */
`;

export default Textarea;
