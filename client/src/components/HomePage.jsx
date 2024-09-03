import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis">Fitness Tracker</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Welcome to the Fitness Tracker where you track all your fitness needs from.
          Weightlifting to cardio. See how you do week by week!
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button 
            type="button" 
            className="btn btn-primary btn-lg px-4 gap-3" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary btn-lg px-4"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;