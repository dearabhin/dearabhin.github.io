
import React from 'react';
import { PaperclipIcon } from './icons/PaperclipIcon';
import { MicIcon } from './icons/MicIcon';

export const BroadcastBar: React.FC = () => {
    return (
        <div className="bg-light-header dark:bg-dark-header p-2 flex items-center gap-2 border-t border-light-border dark:border-dark-border">
            <input
                type="text"
                placeholder="Broadcast"
                readOnly
                className="flex-1 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-full px-4 py-2 text-sm text-light-text-alt dark:text-dark-text-alt placeholder-light-text-alt/70 dark:placeholder-dark-text-alt/70 cursor-not-allowed"
            />
            <button className="p-2 text-light-icon dark:text-dark-icon">
                <PaperclipIcon />
            </button>
            <button className="p-2 text-light-icon dark:text-dark-icon">
                <MicIcon />
            </button>
        </div>
    );
};
