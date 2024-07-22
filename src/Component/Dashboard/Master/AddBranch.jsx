import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddBranch = () => {
  const [branches, setBranches] = useState([
    { name: 'Branch 1', address: '123 Main St', isActive: true },
    { name: 'Branch 2', address: '456 Oak Ave', isActive: false },
    { name: 'Branch 3', address: '789 Pine Rd', isActive: true }
  ]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const editFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        setName('');
        setAddress('');
        setEditingIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddBranch = () => {
    if (name && address) {
      const newBranch = { name, address, isActive: true }; // Defaulting to active
      setBranches([...branches, newBranch]);
      setName('');
      setAddress('');
    }
  };

  const handleEditBranch = (index) => {
    setEditingIndex(index);
    setName(branches[index].name);
    setAddress(branches[index].address);
  };

  const handleSaveEdit = () => {
    if (name && address) {
      const updatedBranches = branches.map((branch, index) =>
        index === editingIndex ? { ...branch, name, address } : branch
      );
      setBranches(updatedBranches);
      setName('');
      setAddress('');
      setEditingIndex(-1);
    }
  };

  const handleDeleteBranch = (index) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    setBranches(updatedBranches);
  };

  const handleToggleActive = (index) => {
    const updatedBranches = branches.map((branch, i) =>
      i === index ? { ...branch, isActive: !branch.isActive } : branch
    );
    setBranches(updatedBranches);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Branch</h2>
      <div ref={editFormRef} className="flex justify-center mb-4">
        <input 
          type="text" 
          placeholder="Branch Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="p-2 border rounded mr-2"
        />
        <input 
          type="text" 
          placeholder="Branch Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="p-2 border rounded mr-2"
        />
        {editingIndex === -1 ? (
          <button onClick={handleAddBranch} className="p-2 bg-blue-500 text-white rounded">Add</button>
        ) : (
          <button onClick={handleSaveEdit} className="p-2 bg-green-500 text-white rounded">Save</button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-400">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr 
                key={index} 
                className={`border-b ${index % 2 === 0 ? 'bg-cyan-50' : 'bg-slate-100'}`}
              >
                <td className="py-2 px-4">{branch.name}</td>
                <td className="py-2 px-4">{branch.address}</td>
                <td className="py-2 px-4">{branch.isActive ? 'Active' : 'Inactive'}</td>
                <td className="py-2 px-4 text-center">
                  <FaEdit 
                    className="text-blue-500 cursor-pointer mr-4 inline" 
                    onClick={() => handleEditBranch(index)} 
                  />
                  <button 
                    className={`p-2 rounded ${
                      branch.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                    onClick={() => handleToggleActive(index)}
                    style={{ width: '100px' }} // Fixed width for the button
                  >
                    {branch.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <FaTrash 
                    className="text-red-500 cursor-pointer inline ml-4" 
                    onClick={() => handleDeleteBranch(index)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddBranch;
