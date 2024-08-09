import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure you have this CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_email || !formData.user_password) {
      setError('Please fill in all fields.');
      return;
    }

    const payload = {
      user_email: formData.user_email,
      user_password: formData.user_password
    };

    try {
      const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', payload);

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setSuccess('Login successful!');
        setError('');
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials and try again.');
        setSuccess('');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="user_email" placeholder="Email" value={formData.user_email} onChange={handleChange} />
          <input type="password" name="user_password" placeholder="Password" value={formData.user_password} onChange={handleChange} />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
