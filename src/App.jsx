import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
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
          <Route exact path="/2/:vehiculo" component={Paso2} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
