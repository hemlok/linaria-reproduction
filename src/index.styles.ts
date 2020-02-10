import { css } from "linaria";
import { dimensions } from "./tokens";

export const text = css``;

export const square = css`
  width: ${dimensions.large}px;
  background: red;

  .${text} {
    color: red;
  }
`;
