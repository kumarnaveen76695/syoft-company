import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Ensure you have this CSS file

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user info found
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="dashboard-container">
      {user ? (
        <div className="user-info">
          <h2>Welcome, {user.user_fullname || 'User'}</h2>
          <div className="user-details">
            <p><strong>Email:</strong> kumarnaveen76695@gmail.com{user.user_email}</p>
            <p><strong>Phone:</strong> 1234567890{user.user_phone}</p>
            <p><strong>Company:</strong> syoft{user.user_company}</p>
            <p><strong>City:</strong> Hyderabad</p>
            <p><strong>Zipcode:</strong> 500072</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
