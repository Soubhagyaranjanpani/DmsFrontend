import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdMail, IoMdKey } from 'react-icons/io';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:8082/api/v1/auth/forgot-password', { email });
      alert('OTP sent to your email!');
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Network error: Please check your connection or try again later.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post('http://localhost:8082/api/v1/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      alert('Password reset successful. Please login with your new password.');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Network error: Please check your connection or try again later.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white flex items-center" htmlFor="email">
              <IoMdMail className="mr-2" />
              Email
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white flex items-center" htmlFor="otp">
              <IoMdKey className="mr-2" />
              OTP
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              placeholder="Enter OTP received on email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white flex items-center" htmlFor="newPassword">
              <IoMdKey className="mr-2" />
              New Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <img
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?ga=GA1.1.302993418.1719829018&semt=ais_user"
          alt=""
          className="hidden lg:block lg:w-1/2 object-cover rounded-l-lg"
        />
        <div className="w-full lg:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Forgot Password</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {renderFormStep()}
            </form>
            <div className="text-center mt-4">
              <button
                className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
