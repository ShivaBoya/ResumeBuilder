import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 text-foreground"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-slate-700 fill-slate-700" />
            )}
        </button>
    );
};

export default ThemeToggle;
