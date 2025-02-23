'use client'

import { Sun, Moon, Home, Plus, PieChart, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/components/nav/NavLink";

export const Navbar = ({ currentPage, onNavigate, isDarkMode, onThemeToggle }) => (
  <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Finance Tracker</span>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink 
              icon={<Home className="w-4 h-4" />} 
              text="Dashboard" 
              isActive={currentPage === 'dashboard'} 
              onClick={() => onNavigate('dashboard')}
            />
            <NavLink 
              icon={<Plus className="w-4 h-4" />} 
              text="Expenses" 
              isActive={currentPage === 'expenses'} 
              onClick={() => onNavigate('expenses')}
            />
            <NavLink 
              icon={<PieChart className="w-4 h-4" />} 
              text="Insights" 
              isActive={currentPage === 'insights'} 
              onClick={() => onNavigate('insights')}
            />
            <NavLink 
              icon={<Wallet className="w-4 h-4" />} 
              text="Budget" 
              isActive={currentPage === 'budget'} 
              onClick={() => onNavigate('budget')}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={onThemeToggle}
            className="ml-4"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  </nav>
);