import React from 'react';
import Logo from '../../assets/images/full-logo.png';
const Introduction = () => {
  return (
    <div className="text-dark-text flex justify-center items-center min-h-screen max-w-screen-lg mx-auto">
      <div className="text-center max-w-lg mx-auto">
        <img className="mx-auto h-[150px] w-auto" src={Logo} alt="Logo" />
        <h1 className="text-4xl font-extrabold text-white">
          Temukan Film, Drama, Series, Anime dan banyak lagi di Film Finder🎬
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Please login to your account
        </p>
        <div className="flex justify-center mt-4">
          <a href="/login"
            className="w-40 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-accent hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </a>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Don't have an account? 
          <a href="/register"
            className="text-indigo-500 hover:underline ml-1">
            Register
          </a>
        </p>
        <p className="mt-2 text-sm text-gray-400">
          <button 
              className="text-indigo-500 hover:underline bg-transparent border-none cursor-pointer"
              onClick={() => window.location.href = '/home'}
          >
              Home
          </button>
        </p>
      </div>
    </div>
  );
}

export default Introduction;