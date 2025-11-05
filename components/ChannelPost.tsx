
import React from 'react';
import { ChannelPostData, Project } from '../types';
import { GitHubIcon } from './icons/GitHubIcon';

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => (
    <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10">
        <div className="flex justify-between items-start">
            <h4 className="font-bold text-sm">{project.title}</h4>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ml-2 shrink-0">
                <GitHubIcon className="w-5 h-5" />
            </a>
        </div>
        <p className="text-xs text-light-text-alt dark:text-dark-text-alt mt-1">{project.date}</p>
        <p className="text-sm mt-1 mb-2">{project.description}</p>
        <div className="flex flex-wrap -m-1">
            {project.tags.map(tag => (
                <span key={tag} className="m-1 bg-black/10 dark:bg-white/10 text-xs px-2 py-0.5 rounded-full">{tag}</span>
            ))}
        </div>
    </div>
);

const PostContent: React.FC<{ post: ChannelPostData }> = ({ post }) => {
    const { content } = post;

    switch(content.type) {
        case 'about':
            return <p className="whitespace-pre-wrap">{content.text}</p>;
        case 'education':
            return (
                <div>
                    <h3 className="font-bold">{content.degree}</h3>
                    <p>{content.college}</p>
                    <p className="text-sm text-light-text-alt dark:text-dark-text-alt">{content.duration}</p>
                </div>
            );
        case 'skills':
            return (
                 <div className="flex flex-wrap -m-1">
                    {content.skills.map(skill => (
                        <span key={skill} className="m-1 bg-black/10 dark:bg-white/10 text-sm px-3 py-1 rounded-lg">{skill}</span>
                    ))}
                </div>
            );
        case 'projects':
            return (
                <div>
                    <h3 className="font-bold text-lg mb-2">Projects Showcase</h3>
                    <div className="space-y-3">
                         {content.projects.map(p => <ProjectItem key={p.title} project={p} />)}
                    </div>
                </div>
            );
        case 'interests':
             return (
                 <div>
                    <h3 className="font-bold text-lg mb-2">Research Interests</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {content.interests.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                 </div>
            );
        case 'blog':
             return (
                 <div>
                    <h3 className="font-bold text-lg mb-2">Latest Blog Posts</h3>
                     <div className="space-y-3">
                        {content.posts.map(p => (
                            <div key={p.title} className="mt-2 pt-2 border-t border-black/10 dark:border-white/10">
                                <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-bold text-sm text-light-text-link dark:text-dark-text-link hover:underline">{p.title}</a>
                                <p className="text-sm mt-1">{p.excerpt}</p>
                            </div>
                        ))}
                    </div>
                 </div>
             );
        default:
            return null;
    }
}

export const ChannelPost: React.FC<{ post: ChannelPostData }> = ({ post }) => {
    return (
        <div className="max-w-xl ml-auto flex justify-end">
            <div className="bg-light-msg-in dark:bg-dark-msg-out rounded-lg rounded-br-none shadow-sm p-3 text-sm text-light-text dark:text-dark-text">
                <div className="font-semibold text-light-text-link dark:text-dark-text-link text-xs">
                    Forwarded from {post.forwardedFrom}
                </div>
                <div className="mt-2">
                   <PostContent post={post} />
                </div>
                <div className="text-right text-xs text-light-text-alt dark:text-dark-text-alt mt-2">
                    {post.timestamp}
                </div>
            </div>
        </div>
    );
};
