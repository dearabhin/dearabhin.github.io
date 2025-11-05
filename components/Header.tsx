
import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GitHubIcon } from './icons/GitHubIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { ThemeToggle } from './ThemeToggle';

const socialLinks = [
  { href: "https://www.linkedin.com/in/abhin-krishna", icon: <LinkedInIcon />, label: "LinkedIn" },
  { href: "https://www.abhinkrishna.com", icon: <GlobeIcon />, label: "Blog" },
  { href: "https://github.com/dearabhin", icon: <GitHubIcon />, label: "GitHub" },
];

export const Header: React.FC = () => {
  return (
    <header className="relative">
      <div className="absolute top-0 right-0 z-10">
        <ThemeToggle />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-1">
          Abhin Krishna
        </h1>
        <p className="text-light-text-alt dark:text-dark-text-alt mb-3 break-words">
          Kochi, Kerala, India | dearabhin [at] gmail [dot] com
        </p>
        <div className="flex justify-center md:justify-start items-center space-x-4">
          {socialLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-light-primary dark:text-dark-primary hover:text-light-primary-hover dark:hover:text-dark-primary-hover font-semibold transition-colors duration-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
              {index < socialLinks.length - 1 && <span className="text-light-text-alt/50 dark:text-dark-text-alt/50">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};