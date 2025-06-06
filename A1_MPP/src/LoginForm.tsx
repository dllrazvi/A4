import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { username, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/app';  // sau navigate('/app');
  } catch (error) {
    setError('Invalid username or password');
  }
};


  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Create one</Link></p>
    </div>
  );
};

export default LoginForm;
