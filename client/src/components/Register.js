import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/register.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    role: 'Student',
    password: '' 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      alert('Account created successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='register-form'>
      <h2 className='register'>Register</h2>
      <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='name'>
          <input className='name-input' type="text" name="name" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className='email'>
          <input className='email-input' type="email" name="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className='phoneno'>
          <input className='phoneno-input' type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
        </div>
        <div className='password'>
          <input className='password-input' type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>
        <div className='dropdown'>
          <select  className='role' name="role" onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Institute">Institute</option>
          </select>
        </div>
        <button className='submit' type="submit">Register</button>
      </form>
      </div>
      
      <p className='last'>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;
