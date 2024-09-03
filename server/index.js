import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fitness_tracker',
  password: 'Vem123', // Make sure this matches your PostgreSQL password
  port: 5432,
});

// Registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const user = result.rows[0];
  
      if (user.password === password) {
        res.status(200).json({ message: 'Login successful', userId: user.id });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// User profile page
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

app.post('/log-workout', async (req, res) => {
  const { userId, exercise, sets, reps, weight } = req.body;
  
  try {
    await pool.query(
      'INSERT INTO workouts (user_id, exercise, sets, reps, weight, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)',
      [userId, exercise, sets, reps, weight]
    );
    res.status(201).json({ message: 'Workout logged successfully' });
  } catch (error) {
    console.error('Error logging workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/workouts/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query('SELECT * FROM workouts WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user profile
app.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    // Delete user workouts
    await pool.query('DELETE FROM workouts WHERE user_id = $1', [userId]);

    // Delete user profile
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    res.status(200).json({ message: 'User and associated workouts deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete specific workout log
app.delete('/log-workout/:id', async (req, res) => {
  const logId = req.params.id;

  try {
    await pool.query('DELETE FROM workouts WHERE id = $1', [logId]);
    res.status(200).json({ message: 'Workout log deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

