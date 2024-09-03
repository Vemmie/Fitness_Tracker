import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm'; // Import your AuthForm component
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // Fetch API data when the component mounts
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log(response.data); // Getting stuff from the backend
      } catch (error) {
        console.error("Error fetching data:", error); // To handle errors
      }
    };

    fetchAPI();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;