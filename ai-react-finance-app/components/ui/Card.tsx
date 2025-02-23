import React from "react";

export const Card = ({ children, className = "" }) => {
  return <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};