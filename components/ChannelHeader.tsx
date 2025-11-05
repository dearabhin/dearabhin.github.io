
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SearchIcon } from './icons/SearchIcon';
import { MoreIcon } from './icons/MoreIcon';

interface ChannelHeaderProps {
    onInfoClick: () => void;
}

const profilePicUrl = "https://cdn5.telesco.pe/file/YmCPQpfTCSJUJ2be7QL_Z8oUcPTOpxjJ2tp28EL7UbaQFrCuSXi8Q2nezJNr58VI270g5GeS1aRlG4vVmvKm1ly2_ZDTnvrNw7xzeR8oNvePWdK5FAy5NqiRsaFsaaD17EWYxq0nHn7CaIcIPWqo33VSY3f8MnGhf695GNGcA-A25l1lV9ObiYIdFuTE5FwlrNd_OIgzvFLzWqPo65wjlBCqT5S-2qOaGANhfzxbTh7FV_rG6xXfJF6p5N8vlrnU9UheUPXgb-CkWeA-5lo8Qooh0oBHXaSrBAwN6ni_1ax-lGYMdkuhh-wfx3vQHGyvzgerGkmDqF_nlH7D3j5lgA.jpg";

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
