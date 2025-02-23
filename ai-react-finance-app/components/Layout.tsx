'use client'

import { Navbar } from "@/components/nav/Navbar";

export const Layout = ({ children, currentPage, onNavigate, isDarkMode, onThemeToggle }) => (
  <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
    <Navbar 
      currentPage={currentPage} 
      onNavigate={onNavigate}
      isDarkMode={isDarkMode}
      onThemeToggle={onThemeToggle}
    />
    <main className="pt-16">
      <div className="max-w-7xl mx-auto p-4">
        {children}
      </div>
    </main>
  </div>
);