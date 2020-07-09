import { createGlobalStyle } from "styled-components";
import { rem } from "polished";

export const GlobalStyle = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    font-size: ${rem("16px")};
    /* font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;      */
    font-family: 'Helvetica', sans-serif;
    box-sizing: border-box;
    }
    button:focus {
    outline: 0;
    }
    body {
        background-color: #F8F8F8;
    }
`;

export const theme = {};
