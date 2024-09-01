import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

    ${(props) =>
    props.type === "grid" &&
    css`
      display: grid;
      width: 70rem;
      grid-template-columns: repeat(2, 1fr); // Creates two equal-width columns
      gap: 1rem; // Adds space between grid items (optional)
    `}
    overflow: visible;

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
