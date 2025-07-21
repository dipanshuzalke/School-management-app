import React from 'react';
import { Bell, Menu, Moon, Sun, Download } from 'lucide-react';

interface HeaderProps {
  title: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleMenu: () => void;
  notificationCount: number;
  onNotificationsClick: () => void;
  isInstallable: boolean;
  onInstallClick: () => void;
}

export function Header({
  title,
  isDarkMode,
  onToggleDarkMode,
  onToggleMenu,
  notificationCount,
  onNotificationsClick,
  isInstallable,
  onInstallClick
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {isInstallable && (
              <button
                onClick={onInstallClick}
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                title="Install App"
              >
                <Download size={18} />
              </button>
            )}
            
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={onNotificationsClick}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}