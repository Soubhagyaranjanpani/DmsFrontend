import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddCategory = () => {
  const [categories, setCategories] = useState([
    { name: 'Category 1', isActive: true },
    { name: 'Category 2', isActive: false },
    { name: 'Category 3', isActive: true }
  ]);
  const [name, setName] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const editFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        setName('');
        setEditingIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddCategory = () => {
    if (name) {
      const newCategory = { name, isActive: true }; // Defaulting to active
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
      setEditingIndex(-1);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleToggleActive = (index) => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, isActive: !category.isActive } : category
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Add Category</h2>
      <div ref={editFormRef} className="flex justify-center mb-4">
        <input 
          type="text" 
          placeholder="Category Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="p-2 border rounded mr-2"
        />
        {editingIndex === -1 ? (
          <button onClick={handleAddCategory} className="p-2 bg-indigo-500 text-white rounded">Add</button>
        ) : (
          <button onClick={handleSaveEdit} className="p-2 bg-green-500 text-white rounded">Save</button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-indigo-300">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'}`}>
                <td className="py-2 px-4">{category.name}</td>
                <td className="py-2 px-4">{category.isActive ? 'Active' : 'Inactive'}</td>
                <td className="py-2 px-4 text-center">
                  <FaEdit 
                    className="text-blue-500 cursor-pointer mr-4 inline" 
                    onClick={() => handleEditCategory(index)} 
                  />
                  <button 
                    className={`p-2 rounded ${
                      category.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                    onClick={() => handleToggleActive(index)}
                    style={{ width: '100px' }} // Fixed width for the button
                  >
                    {category.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <FaTrash 
                    className="text-red-500 cursor-pointer inline ml-4" 
                    onClick={() => handleDeleteCategory(index)} 
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

export default AddCategory;
