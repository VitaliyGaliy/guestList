import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => (
    <div className="sweet-loading">
        <ClipLoader
            css={override}
            size={150}
            color={"#123abc"}
        />
    </div>
);


export default Spinner