import React from "react";

export const Select = ({ children, value, onChange, className = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }) => <div className="border p-2 rounded-lg">{children}</div>;
export const SelectContent = ({ children }) => <div className="border p-2 rounded-lg">{children}</div>;
export const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;
export const SelectValue = ({ placeholder }) => <span className="text-gray-500">{placeholder}</span>;