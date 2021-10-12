import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
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
            <Route path="/registro" component={Login}/>
            <Route exact path="/" component={Login}/>

            <Redirect to="/registro" />
          </Switch>
        </Router>
    </>
  );
}

export default App;