import logo from '../../assets/images/full-logo.png';
import React from 'react';
const LoginHeader = () => {
  return (
    <div className="text-center">
      <img className="mx-auto h-[150px] w-auto" src={logo} alt="Logo" />
      <h2 className="text-3xl font-extrabold text-white">Hello! 👋</h2>
      <p className="mt-2 text-sm text-gray-400">Please login to your account</p>
    </div>
  );
};

export default LoginHeader;