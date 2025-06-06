// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MainApp from './MainApp';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
