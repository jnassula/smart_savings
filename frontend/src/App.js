
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Objetivo from './pages/Objetivos';
import Lista from './pages/Lista';
import Login from './pages/Login';
import Carteira from './pages/Carteira';
import InicioButton from './components/Inicio';
import Compras from './pages/Compras';
import ObjetivoTargetWizard from './components/ObjectivoTargetWizard'
import styles from '../src/styles/App.module.css';


function App() {
  return (
    <div className={styles.App}>
      <InicioButton />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/lista">
          <Compras />
        </Route>
        <Route path="/lista/:id">
          <Lista />
        </Route>
        <Route path="/objetivo">
          <Objetivo />
        </Route>
        <Route path="/objetivoWizard">
          <ObjetivoTargetWizard />
        </Route>
        <Route path="/saldo">
          <Carteira />
        </Route>
      </Switch>
    </div>


  );
}

export default App;
