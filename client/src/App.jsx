import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth.jsx';
import TaskList from './components/TaskList.jsx';
import Navbar from './components/Navbar.jsx';
import UserCountPopup from './components/UserCountPopup';

function App() {
  // Store token from localStorage for persistent login
  const [token, setToken] = useState(localStorage.getItem('token'));

  // When login/register is successful
  const handleAuth = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  // Handle logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
  <BrowserRouter>
    <div className="app-container">
      <Navbar token={token} logout={logout} />
      <UserCountPopup />
      <Routes>
      <Route path="/login" element={<Auth onAuth={handleAuth} />} />
      <Route  path="/"  element={token ? <TaskList token={token} /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;