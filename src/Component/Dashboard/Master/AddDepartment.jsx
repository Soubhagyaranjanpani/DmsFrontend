import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddDepartment = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT', branch: 'New York', isActive: true },
    { id: 2, name: 'HR', branch: 'San Francisco', isActive: false },
    { id: 3, name: 'Finance', branch: 'Chicago', isActive: true },
  ]);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const editFormRef = useRef(null);

  // Effect to handle clicks outside the edit form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        // Clicked outside the edit form, close without saving
        setName('');
        setBranch('');
        setEditingIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddDepartment = () => {
    if (name && branch) {
      const newDepartment = { id: Date.now(), name, branch, isActive: true }; // Defaulting to active
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
      setEditingIndex(-1);
    }
  };

  const handleDeleteDepartment = (id) => {
    const updatedDepartments = departments.filter(department => department.id !== id);
    setDepartments(updatedDepartments);
  };

  const handleToggleActive = (id) => {
    const updatedDepartments = departments.map(department =>
      department.id === id ? { ...department, isActive: !department.isActive } : department
    );
    setDepartments(updatedDepartments);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Department</h2>
      <div className="flex flex-col md:flex-row justify-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <input 
          type="text" 
          placeholder="Department Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="p-2 border rounded md:mr-2"
        />
        <input 
          type="text" 
          placeholder="Branch Name" 
          value={branch} 
          onChange={(e) => setBranch(e.target.value)} 
          className="p-2 border rounded md:mr-2"
        />
        {editingIndex === -1 ? (
          <button onClick={handleAddDepartment} className="p-2 bg-blue-500 text-white rounded">Add</button>
        ) : (
          <button onClick={handleSaveEdit} className="p-2 bg-green-500 text-white rounded">Save</button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-blue-200">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Branch</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={department.id} className={`border-b ${index % 2 === 0 ? 'bg-slate-100' : 'bg-neutral-200'}`}>
                <td className="py-2 px-4">{department.name}</td>
                <td className="py-2 px-4">{department.branch}</td>
                <td className="py-2 px-4">{department.isActive ? 'Active' : 'Deactive'}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <FaEdit 
                    className="text-blue-500 cursor-pointer inline-block align-middle" 
                    onClick={() => handleEditDepartment(index)} 
                  />
                  {editingIndex === index ? (
                    <span ref={editFormRef}>
                      <button 
                        className={`p-2 rounded ${
                          department.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}
                        onClick={() => handleToggleActive(department.id)}
                        style={{ width: '100px' }} // Fixed width for both Activate and Deactivate buttons
                      >
                        {department.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </span>
                  ) : (
                    <span>
                      <button 
                        className={`p-2 rounded ${
                          department.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}
                        onClick={() => handleToggleActive(department.id)}
                        style={{ width: '100px' }} // Fixed width for both Activate and Deactivate buttons
                      >
                        {department.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </span>
                  )}
                  <FaTrash 
                    className="text-red-500 cursor-pointer inline-block align-middle" 
                    onClick={() => handleDeleteDepartment(department.id)} 
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

export default AddDepartment;
