import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    exerciseName: '',
    reps: '',
    sets: '',
    weight: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/workouts/${userId}`);
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchUser();
    fetchWorkouts();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/log-workout', {
        userId,
        ...formData
      });
      setFormData({ exerciseName: '', reps: '', sets: '', weight: '' });
      const response = await axios.get(`http://localhost:3000/workouts/${userId}`);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error logging workout:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${userId}`);
      alert('Profile deleted successfully');
      // Optionally redirect to home page or log out user
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleDeleteWorkout = async (logId) => {
    try {
      await axios.delete(`http://localhost:3000/log-workout/${logId}`);
      setWorkouts(workouts.filter(workout => workout.id !== logId));
    } catch (error) {
      console.error('Error deleting workout log:', error);
    }
  };

  return (
    <div className="container">
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <h2>{user.email}</h2>
          <p>ID: {user.id}</p>
          <button onClick={handleDeleteProfile} className="btn btn-danger">Delete Profile</button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Exercise Name"
              value={formData.exerciseName}
              onChange={(e) => setFormData({ ...formData, exerciseName: e.target.value })}
            />
            <input
              type="number"
              placeholder="Reps"
              value={formData.reps}
              onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
            />
            <input
              type="number"
              placeholder="Sets"
              value={formData.sets}
              onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
            />
            <input
              type="number"
              placeholder="Weight"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">Log Workout</button>
          </form>

          <h3>Your Workouts</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Exercise</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{new Date(workout.created_at).toLocaleDateString()}</td>
                  <td>{workout.exercise_name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.sets}</td>
                  <td>{workout.weight}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteWorkout(workout.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;