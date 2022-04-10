import React from 'react';
import { createGlobalStyle, ThemeContext } from "styled-components";
import reset from "styled-reset";
import ToDoList from './components/ToDoList';

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
    background-color: ${props => props.theme.bgColor};
  }
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
