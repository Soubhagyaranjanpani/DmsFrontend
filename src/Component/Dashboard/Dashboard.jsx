import React, { useState } from 'react';
import { FaUsers, FaCog, FaBoxOpen, FaTags, FaClipboardList } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import AddBranch from './Master/AddBranch';  // Adjust the import path as needed
import AddCategory from './Master/AddCategory';
import AddDepartment from './Master/AddDepartment';

const Dashboard = () => {
  const [active, setActive] = useState('Dashboard');
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <FaUsers /> },
    {
      name: 'Master', icon: <RiAdminFill />, subItems: [
        { name: 'Add Branch', icon: <FaBoxOpen /> },  // Changed icon
        { name: 'Add Category', icon: <FaTags /> },
        { name: 'Add Department', icon: <FaClipboardList /> },  // Changed icon
      ]
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="bg-maroon-600 text-white w-60 min-h-screen flex flex-col justify-between">
        <div>
          <div className="p-4 text-center text-2xl font-bold">
            <div className="flex items-center justify-center">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/2341733199/display_1500/stock-vector-dms-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-2341733199.jpg"  // Replace with your image URL
                alt="Logo"
                className="w-24 h-24 rounded-full"  // Rounded logo
              />
            </div>
          </div>
          <nav>
            <ul>
              {menuItems.map(item => (
                <div key={item.name}>
                  <li
                    className={`p-4 mt-2 flex items-center cursor-pointer ${active === item.name ? 'bg-white text-maroon-600 rounded-lg mr-2 ' : 'hover:bg-maroon-700'}`}
                    onClick={() => {
                      if (item.name === 'Master') {
                        setIsMasterOpen(!isMasterOpen);
                      }
                      setActive(item.name);
                    }}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </li>
                  {item.name === 'Master' && isMasterOpen && (
                    <ul className="ml-6 mt-2">
                      {item.subItems.map(subItem => (
                        <li
                          key={subItem.name}
                          className={`p-2 mt-2 flex items-center cursor-pointer rounded-lg mr-2 ${active === subItem.name ? 'bg-white text-maroon-600' : 'hover:bg-maroon-700'}`}
                          onClick={() => setActive(subItem.name)}
                        >
                          {subItem.icon}
                          <span className="ml-3">{subItem.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </ul>
          </nav>
        </div>
        <nav className="mb-4">
          <ul>
            <li
              key="Settings"
              className={`p-4 flex items-center cursor-pointer ${active === 'Settings' ? 'bg-white text-maroon-600 rounded-lg mr-2' : 'hover:bg-maroon-700'}`}
              onClick={() => setActive('Settings')}
            >
              <FaCog />
              <span className="ml-3">Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-4">
        {active === 'Add Branch' && <AddBranch />}
        {active === 'Add Category' && <AddCategory />}
        {active === 'Add Department' && <AddDepartment />}
      </div>
    </div>
  );
};

export default Dashboard;
