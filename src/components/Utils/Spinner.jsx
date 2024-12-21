import React from 'react';
import { FaCircle } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="w-1 h-1 border-2 border-t-white border-transparent rounded-full spinner"></div>
  </div>
  );
};

export default Spinner;
