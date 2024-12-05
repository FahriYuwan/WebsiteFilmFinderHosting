import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ currentPage, lastPage, onPageChange }) {
  const maxPagesToShow = 5; // Maksimum jumlah halaman yang ditampilkan sekaligus
  const pages = [];

  // Fungsi untuk menentukan halaman yang akan ditampilkan
  const getDisplayedPages = () => {
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > lastPage) {
      endPage = lastPage;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex justify-center items-center py-8" style={{ marginTop: '-40px' }}>
      <nav className="inline-flex space-x-2">
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          First
        </button>
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {displayedPages.map(page => (
          <button
            key={page}
            className={`px-4 py-2 ${currentPage === page ? 'bg-dark-accent' : 'bg-gray-800'} text-white rounded ${currentPage === page ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-accent'}`}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-dark-accent ${currentPage === lastPage ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 ${currentPage === lastPage ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(lastPage)}
        >
          Last
        </button>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;