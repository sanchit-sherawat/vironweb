import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Login</h1>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Enter your username" />
          <input type="password" placeholder="Enter your password" />
          
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me!
            </label>
            <a href="#">Lost your password?</a>
          </div>

          <button type="submit">LOG IN NOW</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
