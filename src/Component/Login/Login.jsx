import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdMail, IoMdLock, IoMdEye, IoMdEyeOff } from 'react-icons/io';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/sign-in', formData);
      if (response.data.token) {
        const role = 'user'; // or determine the role dynamically
        const tokenKey = role.toLowerCase() + "Token";
        localStorage.setItem(tokenKey, response.data.token);
        alert('Login successful');
        navigate('/Dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-400 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2023/11/18/16/04/login-8396701_1280.jpg"
          alt="Login Illustration"
          className="hidden lg:block lg:w-1/2 object-cover rounded-l-lg h-auto"
        />
        <div className="w-full lg:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
              Login to Your Account
            </h3>
            <form className="space-y-4" onSubmit={handleLoginClick}>
              <div className="relative">
                <IoMdMail className="absolute left-0 top-1/3 transform -translate-y-1/3 text-gray-500 dark:text-white w-6 h-6 ml-2 pr-2" />
                <input
                  className="pl-8 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <IoMdLock className="absolute left-0 top-1/3 transform -translate-y-1/2 text-gray-500 dark:text-white w-6 h-6 ml-2 pr-2" />
                <input
                  className="pl-8 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-1/3 transform -translate-y-1/2 text-gray-500 dark:text-white w-6 h-6 mr-2 pr-2"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800 ml-4"
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </button>
              </div>
              <hr className="my-6 border-t" />
              <div className="text-center">
                <button
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  type="button"
                  onClick={() => navigate('/register')}
                >
                  Don't have an account? Register!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
