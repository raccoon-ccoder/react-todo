import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  a {
      text-decoration: none;
      color: inherit;
    }
  * {
      box-sizing: border-box;
    }
  input {
      border: none;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
