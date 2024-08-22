import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/u/dashboard');
        setMessage(response.data.msg);
        console.log(message);
      } catch (error) {
        console.error('Error fetching the dashboard message:', error);
        setMessage('Failed to fetch the message.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
