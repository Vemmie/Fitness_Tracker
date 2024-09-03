import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register';
      const response = await axios.post(url, { email, password });
      
      if (response.status === 200) {
        if (isLogin) {
          const { userId } = response.data; // Get userId from response
          if (userId) {
            localStorage.setItem('userId', userId); // Save userId to localStorage
            navigate(`/profile/${userId}`); // Redirect to profile page
          } else {
            console.error('User ID not received in response');
          }
        } else {
          alert(response.data.message); // Show registration success message
          navigate('/'); // Redirect to home after registration
        }
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            {isLogin ? 'Login' : 'Register'}
          </h1>
          <p className="col-lg-10 fs-4">
            {isLogin ? 'Please log in to your account.' : 'Create a new account.'}
          </p>
        </div>
        <div className="col-md-10 col-lg-8">
          <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              {isLogin ? 'Login' : 'Sign up'}
            </button>
            <hr className="my-4" />
            <small className="text-body-secondary">
              By clicking {isLogin ? 'Login' : 'Sign up'}, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;