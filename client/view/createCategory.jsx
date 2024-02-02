// Import necessary dependencies
import React, { useState } from 'react';
import { createCategory } from '../Requests/resquests';

// CreateCategory component for handling category creation
function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');

  const handleCreateCategory = async () => {
    try {
      // Check if categoryName is not empty
      if (categoryName.trim() === '') {
        console.error('Category name cannot be empty.');
        return;
      }

      // Create a new category object
      const newCategory = {
        name: categoryName.trim(),
      };

      // Call the createCategory function to make the API request
      await createCategory(newCategory);

      // Clear the input field after successful category creation
      setCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <label>
        Category Name:
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </label>
      <button onClick={handleCreateCategory}>Create Category</button>
    </div>
  );
}

export default CreateCategory;
