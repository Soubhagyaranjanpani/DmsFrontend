import React, { useState } from 'react';
import { FaEdit, FaSearch, FaPlusCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ManageBranch = () => {
  const [branches, setBranches] = useState([
    { id: 1, branchName: 'Main Branch', address: '123 Main St', isActive: true },
    { id: 2, branchName: 'Secondary Branch', address: '456 Elm St', isActive: false },
    { id: 3, branchName: 'East Branch', address: '789 Oak St', isActive: true },
    { id: 4, branchName: 'West Branch', address: '101 Pine St', isActive: false },
    { id: 5, branchName: 'North Branch', address: '202 Maple St', isActive: true },
    { id: 6, branchName: 'South Branch', address: '303 Cedar St', isActive: true },
    { id: 7, branchName: 'Central Branch', address: '404 Birch St', isActive: false },
    // Add more items for testing pagination
  ]);

  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownValue, setDropdownValue] = useState('5');
  const [modalVisible, setModalVisible] = useState(false);
  const [branchToToggle, setBranchToToggle] = useState(null);

  const handleAddBranch = () => {
    if (branchName && address) {
      const newBranch = { id: Date.now(), branchName, address, isActive: true };
      setBranches([...branches, newBranch]);
      setBranchName('');
      setAddress('');
    }
  };

  const handleEditBranch = (index) => {
    setEditingIndex(index);
    setBranchName(branches[index].branchName);
    setAddress(branches[index].address);
  };

  const handleSaveEdit = () => {
    if (branchName && address) {
      const updatedBranches = branches.map((branch, index) =>
        index === editingIndex ? { ...branch, branchName, address } : branch
      );
      setBranches(updatedBranches);
      setBranchName('');
      setAddress('');
      setEditingIndex(null);
    }
  };

  const handleToggleActive = (branch) => {
    setModalVisible(true);
    setBranchToToggle(branch);
  };

  const confirmToggleActive = () => {
    const updatedBranches = branches.map(branch =>
      branch.id === branchToToggle.id ? { ...branch, isActive: !branch.isActive } : branch
    );
    setBranches(updatedBranches);
    setModalVisible(false);
    setBranchToToggle(null);
  };

  const filteredBranches = branches.filter(branch =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredBranches.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBranches = filteredBranches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDropdownChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setDropdownValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Branches</h2>

      <div className="mb-6 p-6 bg-blue-50 rounded-lg shadow-md">
        <h3 className="text-2xl mb-4 text-gray-700">Add New Branch</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm flex-grow"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm flex-grow"
          />
          {editingIndex === null ? (
            <button onClick={handleAddBranch} className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center">
              <FaPlusCircle className="mr-2" /> Add Branch
            </button>
          ) : (
            <button onClick={handleSaveEdit} className="p-3 bg-green-600 text-white rounded-lg shadow-md flex items-center">
              Save
            </button>
          )}
          <button onClick={() => { setBranchName(''); setAddress(''); setEditingIndex(null); }} className="p-3 bg-gray-400 text-white rounded-lg shadow-md">
            Reset
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex">
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
            placeholder="Search by Branch Name or Address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-blue-300 rounded-lg shadow-sm pl-10 w-full max-w-md"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">#</th>
              <th className="py-3 px-4 text-left text-gray-600">Branch Name</th>
              <th className="py-3 px-4 text-left text-gray-600">Address</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
              <th className="py-3 px-4 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBranches.map((branch, index) => (
              <tr key={branch.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className="py-3 px-4 text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-4 text-gray-700">{branch.branchName}</td>
                <td className="py-3 px-4 text-gray-700">{branch.address}</td>
                <td className="py-3 px-4 text-gray-700">{branch.isActive ? 'Active' : 'Inactive'}</td>
                <td className="py-3 px-4 text-center flex items-center justify-center space-x-2">
                  <FaEdit
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => handleEditBranch(branches.indexOf(branch))}
                  />
                  <button
                    className={`p-2 rounded-lg text-white ${branch.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={() => handleToggleActive(branch)}
                    style={{ width: '100px' }}
                  >
                    {branch.isActive ? 'Activate' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center"
            disabled={currentPage === 1}
          >
            <FaArrowLeft className="text-white" />
            <span className="ml-2">Previous</span>
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
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
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl mb-4">Confirm Toggle Status</h3>
            <p>Are you sure you want to toggle the status of the branch "{branchToToggle?.branchName}"?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setModalVisible(false)}
                className="p-3 bg-gray-400 text-white rounded-lg shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggleActive}
                className="p-3 bg-blue-600 text-white rounded-lg shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBranch;
