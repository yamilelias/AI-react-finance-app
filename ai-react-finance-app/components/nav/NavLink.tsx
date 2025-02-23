'use client'

export const NavLink = ({ icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
      isActive 
        ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' 
        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);