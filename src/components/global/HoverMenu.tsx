import React, { useState } from 'react';

interface HoverMenuProps {
  label: string;
  children: React.ReactNode;
}

const HoverMenu: React.FC<HoverMenuProps> = ({ label, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className="flex items-center text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
      >
        <span>{label}</span>
        <span className="ml-2 transition-transform">
          <i className={`fa ${hovered ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
        </span>
      </button>
      {hovered && (
        <div className="absolute left-0 top-full mt-2 z-50 w-max min-w-[200px] bg-white shadow-lg rounded-lg p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default HoverMenu;
