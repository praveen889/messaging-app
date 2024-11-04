import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData);
      const userData = res.data;

      localStorage.setItem('loggedInUser', JSON.stringify(userData));

      navigate('/homepage');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className='login-form'>
      <h2 className='login'>Login</h2>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='email'>
            <input className='email-input'type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className='password'>
            <input className='password-input' type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>
          <button className='submit' type="submit">Login</button>
        </form>
      </div>
      
      <p className='last'>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
