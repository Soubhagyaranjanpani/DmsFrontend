import React, { useState } from 'react';
import { FaEdit, FaSearch, FaPlusCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    { name: 'Category 1', isActive: true },
    { name: 'Category 2', isActive: false },
    { name: 'Category 3', isActive: true },
    { name: 'Category 4', isActive: false },
    { name: 'Category 5', isActive: true },
    // Add more data for pagination example
  ]);

  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownValue, setDropdownValue] = useState('5'); // For dropdown display

  const handleAddCategory = () => {
    if (name) {
      const newCategory = { name, isActive: true };
      setCategories([...categories, newCategory]);
      setName('');
    }
  };

  const handleEditCategory = (index) => {
    setEditingIndex(index);
    setName(categories[index].name);
  };

  const handleSaveEdit = () => {
    if (name) {
      const updatedCategories = categories.map((category, index) =>
        index === editingIndex ? { ...category, name } : category
      );
      setCategories(updatedCategories);
      setName('');
      setEditingIndex(null);
    }
  };

  const handleToggleActive = (index) => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, isActive: !category.isActive } : category
    );
    setCategories(updatedCategories);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDropdownChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setDropdownValue(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Categories</h2>

      {/* Add Category Form */}
      <div className="mb-6 p-6 bg-blue-50 rounded-lg shadow-md">
        <h3 className="text-2xl mb-4 text-gray-700">Add New Category</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm flex-grow md:w-1/2"
          />
          {editingIndex === null ? (
            <button onClick={handleAddCategory} className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center">
              <FaPlusCircle className="mr-2" /> Add Category
            </button>
          ) : (
            <button onClick={handleSaveEdit} className="p-3 bg-green-600 text-white rounded-lg shadow-md flex items-center">
              Save
            </button>
          )}
          <button onClick={() => { setName(''); setEditingIndex(null); }} className="p-3 bg-gray-400 text-white rounded-lg shadow-md">
            Reset
          </button>
        </div>
      </div>

      {/* Search and Show Options */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center">
          <div className="relative flex">
            <button className="flex items-center p-3 bg-blue-600 text-white rounded-l-lg shadow-md">
              Show
            </button>
            <select
              value={dropdownValue}
              onChange={handleDropdownChange}
              className="p-3 border border-blue-300 rounded-r-lg shadow-sm bg-white outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by Category Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm pl-10 w-full max-w-md"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-500" />
        </div>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">#</th>
              <th className="py-3 px-4 text-left text-gray-600">Category Name</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
              <th className="py-3 px-4 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className="py-3 px-4 text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-4 text-gray-700">{category.name}</td>
                <td className="py-3 px-4 text-gray-700">{category.isActive ? 'Active' : 'Deactive'}</td>
                <td className="py-3 px-4 text-center flex items-center justify-center space-x-2">
                  <FaEdit
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => handleEditCategory(categories.indexOf(category))}
                  />
                  <button
                    className={`p-2 rounded-lg text-white ${category.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={() => handleToggleActive(index)}
                    style={{ width: '100px' }} // Ensures consistent width for both buttons
                  >
                    {category.isActive ? 'Activate' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center"
          disabled={currentPage === 1}
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center"
          disabled={currentPage === totalPages}
        >
          <FaArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ManageCategories;
