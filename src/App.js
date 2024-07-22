import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Component/Register/RegisterForm';
import LoginForm from './Component/Login/Login';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword'; // Import ForgotPasswordForm component
import Dashboard from './Component/Dashboard/Dashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add route for ForgotPasswordForm */}
        <Route path="/" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
