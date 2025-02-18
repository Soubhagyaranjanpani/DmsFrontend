import React, { useState } from 'react';
import { FaEdit, FaSearch, FaPlusCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AddDepartment = () => {
  const [departments, setDepartments] = useState([
    { name: 'Department 1', branch: 'Branch A', isActive: true },
    { name: 'Department 2', branch: 'Branch B', isActive: false },
    { name: 'Department 3', branch: 'Branch A', isActive: true },
    { name: 'Department 4', branch: 'Branch C', isActive: false },
    { name: 'Department 5', branch: 'Branch B', isActive: true },
    // Add more data for pagination example
  ]);

  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownValue, setDropdownValue] = useState('5');
  const [modalVisible, setModalVisible] = useState(false);
  const [departmentToToggle, setDepartmentToToggle] = useState(null);

  const handleAddDepartment = () => {
    if (name && branch) {
      const newDepartment = { name, branch, isActive: true };
      setDepartments([...departments, newDepartment]);
      setName('');
      setBranch('');
    }
  };

  const handleEditDepartment = (index) => {
    setEditingIndex(index);
    setName(departments[index].name);
    setBranch(departments[index].branch);
  };

  const handleSaveEdit = () => {
    if (name && branch) {
      const updatedDepartments = departments.map((department, index) =>
        index === editingIndex ? { ...department, name, branch } : department
      );
      setDepartments(updatedDepartments);
      setName('');
      setBranch('');
      setEditingIndex(null);
    }
  };

  const handleToggleActive = (index) => {
    setModalVisible(true);
    setDepartmentToToggle(departments[index]);
  };

  const confirmToggleActive = () => {
    const updatedDepartments = departments.map(department =>
      department.name === departmentToToggle.name ? { ...department, isActive: !department.isActive } : department
    );
    setDepartments(updatedDepartments);
    setModalVisible(false);
    setDepartmentToToggle(null);
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredDepartments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedDepartments = filteredDepartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDropdownChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setDropdownValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Departments</h2>

      {/* Add Department Form */}
      <div className="mb-6 p-6 bg-blue-50 rounded-lg shadow-md">
        <h3 className="text-2xl mb-4 text-gray-700">Add New Department</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm flex-grow md:w-1/2"
          />
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm flex-grow md:w-1/2"
          />
          {editingIndex === null ? (
            <button onClick={handleAddDepartment} className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center">
              <FaPlusCircle className="mr-2" /> Add 
            </button>
          ) : (
            <button onClick={handleSaveEdit} className="p-3 bg-green-600 text-white rounded-lg shadow-md flex items-center">
              Edit
            </button>
          )}
          <button onClick={() => { setName(''); setBranch(''); setEditingIndex(null); }} className="p-3 bg-gray-400 text-white rounded-lg shadow-md">
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
            placeholder="Search by Department Name or Branch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm pl-10 w-full max-w-md"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-500" />
        </div>
      </div>

      {/* Departments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">#</th>
              <th className="py-3 px-4 text-left text-gray-600">Department Name</th>
              <th className="py-3 px-4 text-left text-gray-600">Branch</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
              <th className="py-3 px-4 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepartments.map((department, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className="py-3 px-4 text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-4 text-gray-700">{department.name}</td>
                <td className="py-3 px-4 text-gray-700">{department.branch}</td>
                <td className="py-3 px-4 text-gray-700">{department.isActive ? 'Active' : 'Inactive'}</td>
                <td className="py-3 px-4 text-center flex items-center justify-center space-x-2">
                  <FaEdit
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => handleEditDepartment(departments.indexOf(department))}
                  />
                  <button
                    className={`p-2 rounded-lg text-white ${department.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={() => handleToggleActive(departments.indexOf(department))}
                    style={{ width: '100px' }}
                  >
                    {department.isActive ? 'Activate' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center"
            disabled={currentPage === 1}
          >
            <FaArrowLeft className="text-white" />
            <span className="ml-2">Previous</span>
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center"
            disabled={currentPage === totalPages}
          >
            <FaArrowRight className="text-white" />
            <span className="ml-2">Next</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* <button
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md"
            disabled={currentPage === totalPages}
          >
            Show {dropdownValue}
          </button> */}
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-xl mb-4 text-gray-700">Confirm Status Change</h3>
            <p className="mb-4 text-gray-600">
              Are you sure you want to {departmentToToggle?.isActive ? 'deactivate' : 'activate'} the department "{departmentToToggle?.name}"?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmToggleActive}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDepartment;
