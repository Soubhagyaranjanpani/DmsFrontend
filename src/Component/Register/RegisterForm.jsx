import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosPerson, IoIosMail, IoMdPhonePortrait, IoMdLock, IoMdBusiness } from 'react-icons/io';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    department: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRegisterClick = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/signup', formData);
      console.log(response.data);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <img
          src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="hidden lg:block lg:w-1/2 object-cover rounded-l-lg"
        />
        <div className="w-full lg:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
            <form className="space-y-4">
              <div className="md:flex md:space-x-4">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="firstName">
                    <IoIosPerson className="mr-2" />
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="lastName">
                    <IoIosPerson className="mr-2" />
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="name">
                  <IoMdBusiness className="mr-2" />
                  Designation
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Designation"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="phoneNumber">
                  <IoMdPhonePortrait className="mr-2" />
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="email">
                  <IoIosMail className="mr-2" />
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="md:flex md:space-x-4">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="password">
                    <IoMdLock className="mr-2" />
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="confirmPassword">
                    <IoMdLock className="mr-2" />
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="md:flex md:space-x-4">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="department">
                    <IoMdBusiness className="mr-2" />
                    Department
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="department"
                    type="text"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white items-center" htmlFor="location">
                    <IoMdBusiness className="mr-2" />
                    Location
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="location"
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
                <div className="pt-4">
                  <button
                    className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Login!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
