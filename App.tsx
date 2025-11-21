import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ChannelHeader } from './components/ChannelHeader';
import { ChannelInfo } from './components/ChannelInfo';
import { ChannelPost } from './components/ChannelPost';
import { channelPosts } from './constants';
import { ChannelPostData } from './types';

const AppContent: React.FC = () => {
    const { theme } = useTheme();
    const [showInfo, setShowInfo] = useState(false);
    const feedRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        // Scroll to the bottom of the feed on initial load
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, []);

    return (
        // Changed h-screen to h-[100dvh] for better mobile browser support
        <div className="bg-gray-300 dark:bg-black font-sans transition-colors duration-300 antialiased h-[100dvh]">
            <div className="container mx-auto p-0 md:p-4 h-full">
                <div className="flex w-full h-full shadow-2xl rounded-none md:rounded-lg overflow-hidden bg-light-bg dark:bg-dark-bg relative">
                    
                    {/* Main Chat Panel */}
                    {/* Removed conditional 'hidden' class so it stays visible under the sliding panel on mobile */}
                    <div className="flex flex-col flex-1 min-w-0 relative z-0">
                        <ChannelHeader onInfoClick={() => setShowInfo(!showInfo)} />
                        
                        <div ref={feedRef} className="flex-1 overflow-y-auto bg-chat-light dark:bg-chat-dark p-4 space-y-2">
                             {channelPosts.map((post: ChannelPostData) => (
                                <ChannelPost key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Channel Info Panel */}
                    <div className={`
                        w-full md:w-1/3 md:max-w-xs lg:max-w-sm
                        absolute md:static top-0 right-0 h-full z-20
                        transform transition-transform duration-300 ease-in-out
                        ${showInfo ? 'translate-x-0' : 'translate-x-full md:hidden'}
                        bg-light-bg dark:bg-dark-bg
                        border-l border-light-border dark:border-dark-border
                    `}>
                        <ChannelInfo onClose={() => setShowInfo(false)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;
