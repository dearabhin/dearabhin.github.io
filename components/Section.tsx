
import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  isLast?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, children, isLast = false }) => {
  return (
    <section className={`py-8 ${!isLast ? 'border-b border-light-border dark:border-dark-border' : ''}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-6">{title}</h2>
      {children}
    </section>
  );
};
