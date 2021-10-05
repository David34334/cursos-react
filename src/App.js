import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DetalleCurso from './components/DetalleCurso';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Pago from './components/Pago';

function App() {
  return (
    <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/home" component={Home}/>
            <Route exact path="/" component={Login}/>
            <Route path="/detalle-curso" component={DetalleCurso}/>
            <Route path="/pago-curso" component={Pago}/>
          </Switch>
        </Router>
    </>
  );
}

export default App;
