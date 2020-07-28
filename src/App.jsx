import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Paso1 from './components/pasos/Paso1';
import Paso2 from './components/pasos/Paso2';
import Paso3 from './components/pasos/Paso3';
import Paso4 from './components/pasos/Paso4';
import Paso5 from './components/pasos/Paso5';
import Paso6 from './components/pasos/Paso6';
import { setToken } from './actions';

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_API_CLIENT_SECRET;

  const dispatch = useDispatch();

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer {{access_token}}');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');
  urlencoded.append('client_id', CLIENT_ID);
  urlencoded.append('client_secret', CLIENT_SECRET);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  fetch(`${API_URL}/oauth/token`, requestOptions)
    .then((response) => response.json())
    .then((result) => { dispatch(setToken(result.access_token)); })
    .catch((error) => console.log('error', error));

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
        <Switch>
          <Route exact path="/3/" component={Paso3} />
        </Switch>
        <Switch>
          <Route exact path="/4/" component={Paso4} />
        </Switch>
        <Switch>
          <Route exact path="/5/" component={Paso5} />
        </Switch>
        <Switch>
          <Route exact path="/6/" component={Paso6} />
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
  :root {
    --azul: #213c83;
    --verde: #24b3b5;
    --gris: #5f5f5f;
    --verde-disabled: #b6dbd4;
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
