import { useEffect } from 'react'; /*
A hook is a special function that lets you "hook into" React features. React hooks are used to manage side effects and state in functional components.
The useEffect hook allows you to perform side effects in your functional components. Side effects can include data fetching, subscriptions, or manually changing the DOM.
*/
import './App.css'; //adding own css
import 'bootstrap/dist/css/bootstrap.min.css'; //This is just adding bootstrap
import HomePage from './components/HomePage'; // Importing HomePage component
import AuthForm from './components/AuthForm'; // Importing AuthForm component
import axios from 'axios';  //this is very important for APIs this lets you use request to servers to grab data from other external APIs
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//this is the greatest thing in the world it allows to route to different pages.
import ProfilePage from './components/ProfilePage'; // Importing ProfilePage component

function App() {
  // Fetch API data when the component mounts need to rewatch that video
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