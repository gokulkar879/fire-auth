import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home}>
        </PrivateRoute>
         <Route path="/login" component={Login}></Route>
         <Route path="/signup" component={SignUp}></Route>
  
      </Switch>
    </Router>
  );
}

export default App;
