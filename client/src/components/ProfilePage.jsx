import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    console.log('Fetching user data for userId:', userId); // Log the userId

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        setUser(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again later.'); // Set error message
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="container">
      <h1>Profile Page</h1>
      {error ? (
        <div className="alert alert-danger">{error}</div> // Display error message
      ) : user ? (
        <div>
          <h2>{user.email}</h2>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;