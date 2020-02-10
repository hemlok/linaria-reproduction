import { css } from "linaria";
import { dimensions } from "./tokens";
export const text = css``

export const button = css`
  background: purple;
  width: ${dimensions.large}px;

  .${text} {
    color: blue;
  }
`;

