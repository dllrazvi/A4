// RegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      // Redirect to login page after successful registration
      // Replace '/login' with your login route
      window.location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Error registering user');
      } else {
        setError('Error registering user');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
