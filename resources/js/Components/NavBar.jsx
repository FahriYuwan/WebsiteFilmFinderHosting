import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import logoImg from "./../assets/images/just-text.png";
import Button from './Button'; 
import SearchBar from './SearchBar';

function NavBar({ onSearch }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link href="/home">
        <img src={logoImg} id="sidebar-logo" className="w-60 overflow-hidden transition-all" alt="Logo" />
      </Link>

      {/* SearchBar */}
      <div className="flex items-center">
        <SearchBar/>
      </div>

      {/* User Info or Sign In Button */}
      <div className="relative">
        {user ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center text-sm font-semibold focus:outline-none">
                {user.name}
                <span className="ml-3">&#x25BC;</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <Link href="/cmsdramainput" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  CMS
                </Link>
                <Link href="/bookmark" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Bookmark
                </Link>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Profile
                </Link>
                <Link href="/logout" method="post" as="button" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <Button text="Sign in" className="bg-dark-hover px-5 py-3 font-semibold text-dark-text rounded" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;