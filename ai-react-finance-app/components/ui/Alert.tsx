import React from "react";

export const Alert = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white",
    destructive: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-white"
  };

  return <div className={`p-3 rounded-lg ${variants[variant]} ${className}`}>{children}</div>;
};

export const AlertDescription = ({ children }) => <p className="text-sm">{children}</p>;