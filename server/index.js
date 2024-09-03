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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});