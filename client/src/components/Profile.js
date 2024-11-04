import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/profile.css'

function Profile() {
  const [user, setUser] = useState({
    name: '',
    phone_number: '',
    role: '',
    email: ''
  });
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${loggedInUser.id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [loggedInUser.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/users/${loggedInUser.id}`, {
      name: user.name,
      phone_number: user.phone_number,
      role: user.role,
    })
    .then(response => {
      alert('Profile updated successfully');
    })
    .catch(error => {
      console.error('Error updating profile:', error);
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      axios.delete(`http://localhost:5000/users/${loggedInUser.id}`)
        .then(response => {
          localStorage.removeItem('loggedInUser');
          alert('Account deleted successfully');
          navigate('/login');
        })
        .catch(error => {
          console.error('Error deleting account:', error);
        });
    }
  };

  return (
    <div className='profile'>
      <h2 className='p-text'>Profile</h2>
      <div className='profile-form'>
        <div className='profile-name'>
          <p className='f-text'>Name</p>
          <input className='f-input' type="text" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div className='profile-name'>
          <p className='f-text'>Phone Number</p>
          <input className='f-input' type="text" name="phone_number" value={user.phone_number} onChange={handleChange} />
        </div>
        <div className='profile-name'>
          <p className='f-text'>Role</p>
          <select className='role' name="role" value={user.role} onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Institute">Institute</option>
          </select>
        </div>
        <div className='profile-name'>
          <p className='f-text'>Email, (cannot be changed)</p>
          <input className='f-input' type="text" value={user.email} disabled />
        </div>
      </div>
      <div className='buttons'>
        <button className='l-btn-1' onClick={handleUpdate}>Update Profile</button>
        <button className='l-btn' onClick={handleDelete} style={{ color: 'red' }}>Delete Account</button>
      </div>
      
    </div>
  );
}

export default Profile;
