import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Paso1 from './components/pasos/Paso1';
import Paso2 from './components/pasos/Paso2';
import Paso3 from './components/pasos/Paso3';
import Paso4 from './components/pasos/Paso4';
import Paso5 from './components/pasos/Paso5';
import Paso6 from './components/pasos/Paso6';
import Paso7 from './components/pasos/Paso7';
import Paso8 from './components/pasos/Paso8';
import Paso9 from './components/pasos/Paso9';
import Paso10 from './components/pasos/Paso10';
import Paso11 from './components/pasos/Paso11';
import Paso12 from './components/pasos/Paso12';
import Credito from './components/pasos/Credito';
import Debito from './components/pasos/Debito';
import Inspeccion from './components/pasos/Inspeccion';
import InspeccionFotosUno from './components/pasos/InspeccionFotos';
import { setToken } from './actions';

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_API_CLIENT_SECRET;

  const dispatch = useDispatch();

  const myHeaders = new Headers();
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
    .then((result) => {
      dispatch(setToken(result.access_token));
    })
    .catch((error) => console.log('error', error));

  // we need to map the `scale` prop we define below
  // to the transform style property
  function mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  }

  // wrap the `spring` helper to use a bouncy config
  function bounce(val) {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }

  // child matches will...
  const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
      opacity: 0,
      scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
      opacity: bounce(1),
      scale: bounce(1),
    },
  };

  return (
    <>
      <Router>
        <Header />

        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper"
        >
          <Route exact path="/" component={Paso1} />

          <Route exact path="/2/" component={Paso2} />

          <Route exact path="/3/" component={Paso3} />

          <Route exact path="/4/" component={Paso4} />

          <Route exact path="/5/" component={Paso5} />

          <Route exact path="/6/" component={Paso6} />

          <Route exact path="/7/" component={Paso7} />

          <Route exact path="/8/" component={Paso8} />

          <Route exact path="/9/" component={Paso9} />

          <Route exact path="/10/" component={Paso10} />

          <Route exact path="/11/" component={Paso11} />

          <Route exact path="/tarjeta-de-credito/" component={Credito} />

          <Route exact path="/debito-automatico/" component={Debito} />

          <Route exact path="/12/" component={Paso12} />

          <Route
            exact
            path="/inspeccion/fotos/:id"
            component={InspeccionFotosUno}
          />
          <Route exact path="/inspeccion/:id/:prev?" component={Inspeccion} />
        </AnimatedSwitch>
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
