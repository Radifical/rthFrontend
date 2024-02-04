import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://rthbackend.onrender.com/admin/login', credentials);
      console.log(response.data);
      login(response.data.token); // Call the login function with the token
      navigate('/'); // Navigate to the home page upon successful login
    } catch (error) {
      setError('Failed to login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(to right, #141414, #222222)' }}>
    <div className="p-8 rounded-lg shadow-lg w-full max-w-md text-center" style={{ backgroundColor: 'rgba(36, 36, 62, 0.2)' }}>
      <div className="mb-4">
        <div className="rounded-full mx-auto p-2 inline-block outline-10" style={{ maxWidth: '120px', maxHeight: '120px', backgroundColor: 'rgba(36, 36, 62, 0.05)' }}>
          <img className="h-24 w-24 rounded-full" src='https://cdn.discordapp.com/attachments/1134958170482167920/1203564466609061908/ll.png' alt="logo"/>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-blue-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
