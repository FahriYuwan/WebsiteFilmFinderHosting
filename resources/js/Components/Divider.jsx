import React from 'react';
function Divider() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-black">Or continue with</span>
        </div>
      </div>
    </div>
  );
}

export default Divider;
