// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Home';
import Message from './components/Messaging';
import Profile from './components/Profile';

function App() {
  const isLoggedIn = localStorage.getItem('loggedInUser');
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={isLoggedIn ? <Homepage setSelectedUser={setSelectedUser} /> : <Navigate to="/login" />} />
          <Route path="/message" element={isLoggedIn && selectedUser ? <Message selectedUser={selectedUser} /> : <Navigate to="/homepage" />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
