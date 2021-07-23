import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.scss";
import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import PrivateRoute from "./components/PrivateRoute";
import axiosWithAuth from './helpers/axiosWithAuth.js'

function App() {

  const logout = () => {
    axiosWithAuth()
    .post('/logout')
    .then(res => {
      localStorage.removeItem('token');
      localStorage.setItem('username');
      localStorage.setItem('role');
      window.location.href = "/login";
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      window.location.href = "/login";
    })
  };

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <div data-testid="logoutButton" className='logout'>
            {localStorage.getItem('token') ? <Link onClick={logout} to='/login'>logout</Link> : <div></div>}
          </div>
        </header> 

        <Route exact path="/login" component={Login} />

        <PrivateRoute exact path='/bubbles' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.