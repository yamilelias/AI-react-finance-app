import React from "react";

export const Button = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700",
    destructive: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};