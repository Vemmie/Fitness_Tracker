import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage'; // Importing HomePage component
import AuthForm from './components/AuthForm'; // Importing AuthForm component
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage'; // Importing ProfilePage component

function App() {
  // Fetch API data when the component mounts
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log(response.data); // Log data for debugging
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
        // Optionally, you could set an error state here to display an error message to users
      }
    };

    fetchAPI();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/profile/:userId" element={<ProfilePage />} /> {/* Route for user profile */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;