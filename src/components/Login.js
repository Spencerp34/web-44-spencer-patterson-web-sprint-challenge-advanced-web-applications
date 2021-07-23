import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialValues = {
    username: '',
    password: '',
    error: ''
  }
  const [credentials, setCredentials] = useState(initialValues)


  const handleChanges = (e) =>{
    setCredentials({
      ...credentials,
      error: '',
      [e.target.name]: e.target.value
    })
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        window.location.href='/bubbles'
      })
      .catch(err=>{
        setCredentials({
          ...credentials,
          error: 'Uh oh... wrong username/password. Please try again. But right this time.'
        })
      })
    
  }
  
  //replace with error state
  
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>

          <input id="username" name="username" value={credentials.username} onChange={handleChanges} data-testid="username"/>

          <input id="password" name="password" type="password" value ={credentials.password} onChange={handleChanges} data-testid="password" />

          <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{credentials.error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.