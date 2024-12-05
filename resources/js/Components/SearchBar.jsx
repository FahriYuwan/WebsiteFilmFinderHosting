import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('title'); // Default to 'title'

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <input 
        type="text" 
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search movies, logos..." 
        className="w-full sm:w-96 px-4 py-2 text-gray-700 bg-white rounded sm:rounded-l focus:outline-none"
      />
      <select 
        value={searchCategory}
        onChange={handleCategoryChange}
        className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white rounded sm:rounded-r focus:outline-none"
      >
        <option value="title">Title</option>
        <option value="actor">Actor</option>
      </select>
      <Link href={`/searchresultpage?term=${searchTerm}&category=${searchCategory}`} className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-5 py-2 font-semibold bg-custom-blue-light text-dark-text rounded sm:rounded-r">
          Search
        </button>
      </Link>
    </div>
  );
}

export default SearchBar;