import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Paso1 from './components/pasos/Paso1';
import Paso2 from './components/pasos/Paso2';

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Paso1} />
        </Switch>
        <Switch>
          <Route exact path="/2/" component={Paso2} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;

/*
 *
 *
 * STYLES
 *
 *
*/

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap');

  :root {
    --azul: #213c83;
    --verde: #24b3b5;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  body {
    font-family: 'Rubik', sans-serif;
  }

  .container {
    width: 90%;
    margin: auto;
  }
`;
