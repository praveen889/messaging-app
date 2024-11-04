import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/home.css'

function Homepage({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleShowUsers = (role) => {
    setSelectedRole(role);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate('/message');
  };

  const renderUsersByRole = () => {
    return users.filter(user => user.role === selectedRole).map(user => (
      <div className='users-list' key={user.id} onClick={() => handleUserClick(user)}>
       <p className='username-list'>{user.name}</p> 
       <p className='useremail-list'>({user.email})</p> 
      </div>
    ));
  };

  return (
    <div className='home'>
      <div className='home-top'>
        <h2 className='home-heading'>Welcome, {loggedInUser.name}!</h2>
        <button className='profile-btn' onClick={() => navigate('/profile')}>Go to Profile</button>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>

      <div className='body-home'>
        <div>
          <button className='btn-s' onClick={() => handleShowUsers('Student')}>Students</button>
          <button className='btn-t' onClick={() => handleShowUsers('Teacher')}>Teachers</button>
          <button className='btn-i' onClick={() => handleShowUsers('Institute')}>Institutes</button>
        </div>

        {selectedRole && (
        <div className='users' >
          <h3 className='selected-role'>{selectedRole}s</h3>
          {renderUsersByRole()}
        </div>
      )}
      </div>
    </div>
  );
}

export default Homepage;
