import React from "react";

export const Progress = ({ value, className = "" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-lg overflow-hidden dark:bg-gray-700 ${className}`}>
      <div className="h-2 bg-blue-500 transition-all" style={{ width: `${value}%` }}></div>
    </div>
  );
};