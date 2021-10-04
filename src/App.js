import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/home" component={Home}/>
            <Route exact path="/" component={Login}/>
          </Switch>
        </Router>
    </>
  );
}

export default App;
