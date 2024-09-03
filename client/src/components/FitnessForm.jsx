import React, { useState } from 'react';
import axios from 'axios';

const FitnessForm = ({ userId }) => {
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/log-workout', {
          userId,
          exercise,
          sets,
          reps,
          weight,
        });
  
        if (response.status === 201) {
          alert('Workout logged successfully');
          setExercise('');
          setSets('');
          setReps('');
          setWeight('');
        }
      } catch (error) {
        console.error('Error logging workout:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise:</label>
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log Workout</button>
      </form>
    );
  };

export default FitnessForm;