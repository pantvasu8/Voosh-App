import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import './App.css';
function App() {

  return (
    <Router>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
