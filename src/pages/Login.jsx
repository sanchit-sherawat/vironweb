import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import API_BASE_URL from './config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Optionally store token or user info here
        if (response.ok) {
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.token); // Assuming the API returns a token
          localStorage.setItem('userId', data.userId); // Assuming the API returns a user ID
          localStorage.setItem('isAdmin', data.isAdmin); // Assuming the API returns an isAdmin flag
          navigate('/dashboard');
        } else {
          localStorage.removeItem('username');
        }
        
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Login</h1>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              /> Remember me!
            </label>
            <a href="#">Lost your password?</a>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'LOG IN NOW'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;