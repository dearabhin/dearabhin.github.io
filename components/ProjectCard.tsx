
import React from 'react';
import { Project } from '../types';
import { GitHubIcon } from './icons/GitHubIcon';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-light-bg-alt dark:bg-dark-bg-alt border border-light-border dark:border-dark-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-light-primary/50 dark:hover:border-dark-primary/50 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text">
            {project.title}
          </h3>
          <p className="text-sm text-light-text-alt dark:text-dark-text-alt mt-1 mb-3">{project.date}</p>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-text-alt dark:text-dark-text-alt hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          aria-label={`GitHub repository for ${project.title}`}
        >
          <GitHubIcon className="w-6 h-6" />
        </a>
      </div>
      <p className="text-light-text-alt dark:text-dark-text-alt leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap -m-1">
        {project.tags.map((tag) => (
          <span key={tag} className="m-1 bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary px-3 py-1 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
