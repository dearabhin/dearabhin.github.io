
import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GitHubIcon } from './icons/GitHubIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { CloseIcon } from './icons/CloseIcon';

interface ChannelInfoProps {
    onClose: () => void;
}

const profilePicUrl = "https://cdn5.telesco.pe/file/YmCPQpfTCSJUJ2be7QL_Z8oUcPTOpxjJ2tp28EL7UbaQFrCuSXi8Q2nezJNr58VI270g5GeS1aRlG4vVmvKm1ly2_ZDTnvrNw7xzeR8oNvePWdK5FAy5NqiRsaFsaaD17EWYxq0nHn7CaIcIPWqo33VSY3f8MnGhf695GNGcA-A25l1lV9ObiYIdFuTE5FwlrNd_OIgzvFLzWqPo65wjlBCqT5S-2qOaGANhfzxbTh7FV_rG6xXfJF6p5N8vlrnU9UheUPXgb-CkWeA-5lo8Qooh0oBHXaSrBAwN6ni_1ax-lGYMdkuhh-wfx3vQHGyvzgerGkmDqF_nlH7D3j5lgA.jpg";

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode; isLink?: boolean; href?: string }> = ({ icon, label, value, isLink, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 px-4 py-3 ${isLink ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5' : ''}`}>
        <div className="text-light-icon dark:text-dark-icon">{icon}</div>
        <div className="flex-1">
            <div className="text-sm text-light-text dark:text-dark-text">{value}</div>
            <div className="text-xs text-light-text-alt dark:text-dark-text-alt">{label}</div>
        </div>
    </a>
);

export const ChannelInfo: React.FC<ChannelInfoProps> = ({ onClose }) => {
    return (
        <div className="bg-light-bg dark:bg-dark-bg flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center p-2 border-b border-light-border dark:border-dark-border">
                <button onClick={onClose} className="p-2 text-light-icon dark:text-dark-icon md:hidden">
                    <CloseIcon />
                </button>
                <h2 className="font-semibold text-light-text dark:text-dark-text text-lg ml-2">Channel Info</h2>
            </div>
            
            {/* Profile Section */}
            <div className="flex flex-col items-center p-4">
                <img src={profilePicUrl} alt="Channel profile picture" className="w-24 h-24 rounded-full object-cover mb-3" />
                <h1 className="text-xl font-bold text-light-text dark:text-dark-text">Abhin Krishna</h1>
                <p className="text-sm text-light-text-alt dark:text-dark-text-alt">2 subscribers</p>
            </div>

            {/* Info List */}
            <div className="flex-grow overflow-y-auto">
                 <div className="border-t border-light-border dark:border-dark-border py-2">
                    <InfoRow 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15v-5"></path><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
                        label="Info"
                        value="dearabhin [at] gmail [dot] com"
                    />
                     <InfoRow 
                        icon={<GlobeIcon />}
                        label="Blog"
                        value="abhinkrishna.com"
                        isLink
                        href="https://www.abhinkrishna.com"
                    />
                    <InfoRow 
                        icon={<GitHubIcon />}
                        label="GitHub"
                        value="dearabhin"
                        isLink
                        href="https://github.com/dearabhin"
                    />
                    <InfoRow 
                        icon={<LinkedInIcon />}
                        label="LinkedIn"
                        value="abhin-krishna"
                        isLink
                        href="https://www.linkedin.com/in/abhin-krishna"
                    />
                </div>

                {/* Static Tabs */}
                <div className="border-t border-light-border dark:border-dark-border">
                    <div className="flex justify-around text-sm font-semibold text-light-text-alt dark:text-dark-text-alt p-1">
                        <button className="flex-1 p-2 text-light-text-link dark:text-dark-text-link border-b-2 border-light-text-link dark:border-dark-text-link">Media</button>
                        <button className="flex-1 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded">Files</button>
                        <button className="flex-1 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded">Links</button>
                    </div>
                </div>
            </div>
             <footer className="text-center p-4 text-xs text-light-text-alt dark:text-dark-text-alt">
                &copy; {new Date().getFullYear()} Abhin Krishna
            </footer>
        </div>
    );
};
