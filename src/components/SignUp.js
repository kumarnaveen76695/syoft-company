import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Ensure you have this CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_fullname: '',
    user_email: '',
    user_password: '',
    confirm_password: '',
    user_company: '',
    user_phone: '',
    agreeToTerms: false
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_fullname || !formData.user_email || !formData.user_password || !formData.confirm_password || !formData.user_company || !formData.user_phone) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.user_password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and services.');
      return;
    }

    const payload = {
      user_firstname: formData.user_fullname.split(' ')[0],
      user_lastname: formData.user_fullname.split(' ')[1] || '',
      user_email: formData.user_email,
      user_password: formData.user_password,
      user_phone: formData.user_phone,
      user_city: 'Hyderabad',
      user_zipcode: '500072'
    };

    try {
      const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload);

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setSuccess('Registration successful!');
        setError('');
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <div className="info-section">
        <h2>Welcome to Your Community</h2>
        <p>Join our community to enjoy all the benefits we offer. Stay connected, stay informed.</p>
      </div>
      <div className="form-section">
        <h2>Sign Up</h2>
        <p className='para'>Already have an account? <span onClick={() => navigate('/login')} className="login-link">Log in</span></p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="user_fullname" placeholder="Full Name" value={formData.user_fullname} onChange={handleChange} />
          <input type="email" name="user_email" placeholder="Email" value={formData.user_email} onChange={handleChange} />
          <input type="password" name="user_password" placeholder="Password" value={formData.user_password} onChange={handleChange} />
          <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} />
          <input type="text" name="user_company" placeholder="Company" value={formData.user_company} onChange={handleChange} />
          <input type="text" name="user_phone" placeholder="Phone Number" value={formData.user_phone} onChange={handleChange} />
          <div className="terms-container">
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
            <label htmlFor="agreeToTerms">I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and services</a>.</label>
          </div>
          <button type="submit">Create Your Free Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
