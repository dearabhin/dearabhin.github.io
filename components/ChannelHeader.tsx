
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SearchIcon } from './icons/SearchIcon';
import { MoreIcon } from './icons/MoreIcon';

interface ChannelHeaderProps {
    onInfoClick: () => void;
}

const profilePicUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZyWVtbIlhY0I_HjybGdeGxxWvr4FCs2F3r1xl0Qtp0f5lZ9Rr4UXAs4nzQlhqFdu6jymi0MWyUJ8lavQfsoQtG4nWXbQeco4NzKxrXZmtW9YnUC6kgwpR-eL6Oj-WlgYAGnxzluQm9e0NrkPaaU2kYc_Td1eI5P23Ea47mkBtilhTMA/s220/@.jpg";

export const ChannelHeader: React.FC<ChannelHeaderProps> = ({ onInfoClick }) => {
    return (
        <div className="bg-light-header dark:bg-dark-header p-2 flex items-center justify-between border-b border-light-border dark:border-dark-border shadow-sm">
            <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={onInfoClick}
            >
                <img src={profilePicUrl} alt="Channel profile picture" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h1 className="font-bold text-light-text dark:text-dark-text">Abhin Krishna</h1>
                    <p className="text-xs text-light-text-alt dark:text-dark-text-alt">2 subscribers</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <ThemeToggle />
                <button className="p-2 rounded-full text-light-icon dark:text-dark-icon">
                    <SearchIcon />
                </button>
                <button 
                    className="p-2 rounded-full text-light-icon dark:text-dark-icon md:hidden"
                    onClick={onInfoClick}
                >
                    <MoreIcon />
                </button>
            </div>
        </div>
    );
};
