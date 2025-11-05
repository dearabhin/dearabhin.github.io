
import React from 'react';
import { BlogPost } from '../types';

interface BlogPostCardProps {
    post: BlogPost;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    return (
        <div className="bg-light-bg-alt dark:bg-dark-bg-alt border border-light-border dark:border-dark-border rounded-lg p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:border-light-primary/50 dark:hover:border-dark-primary/50 hover:-translate-y-1">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">{post.title}</h3>
            <p className="text-light-text-alt dark:text-dark-text-alt leading-relaxed flex-grow">{post.excerpt}</p>
            <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-light-primary dark:text-dark-primary font-semibold hover:underline"
            >
                Read More &rarr;
            </a>
        </div>
    );
};
