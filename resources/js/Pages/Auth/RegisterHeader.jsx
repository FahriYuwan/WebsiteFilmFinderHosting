import React from 'react';
import logo from '../../assets/images/full-logo.png';

const RegisterHeader = () => {
  return (
    <div className="text-center">
      <img className="mx-auto h-[150px] w-auto" src={logo} alt="Logo" />
      <h2 className="text-3xl ml-8 font-extrabold text-white">Create an Account 🎉</h2>
      <p className="mt-2 text-sm text-gray-400">Please fill in the details to create your account</p>
    </div>
  );
};

export default RegisterHeader;