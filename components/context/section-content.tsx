'use client'
import React, { createContext, useState, useContext } from 'react';
import { toast } from 'sonner';

interface Section {
  title: string;
  pro: boolean;
  date: string;
  bookmarked: boolean;
  description?: string;
}

interface SectionsContextProps {
  sections: Section[];
  toggleBookmark: (index: number) => void;
}

const SectionsContext = createContext<SectionsContextProps | undefined>(undefined);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [sections, setSections] = useState<Section[]>([
    { title: 'Hero', pro: true, date: '3rd of Feb 2024', bookmarked: true, description: 'Detailed header section with heading and graphic/image centred and feature cards on either side.' },
    { title: 'How it works', pro: true, date: '18th of Feb 2024', bookmarked: false },
    { title: 'Services', pro: false, date: '23rd of Feb 2024', bookmarked: false },
    { title: 'Testimonials', pro: true, date: '3rd of Mar 2024', bookmarked: false },
    { title: 'Pricing', pro: true, date: '18th of Mar 2024', bookmarked: true },
    { title: 'FAQ', pro: true, date: '23rd of Mar 2024', bookmarked: false },
    { title: 'Footer', pro: false, date: '3rd of Apr 2024', bookmarked: false },
    { title: 'Contact', pro: true, date: '18th of Apr 2024', bookmarked: false },
    { title: 'Features', pro: false, date: '23rd of Apr 2024', bookmarked: false },
    { title: 'Team', pro: true, date: '3rd of May 2024', bookmarked: false },
    { title: 'Blog', pro: false, date: '18th of May 2024', bookmarked: true },
    { title: 'Portfolio', pro: true, date: '23rd of May 2024', bookmarked: false },
    { title: 'Cta', pro: false, date: '3rd of Jun 2024', bookmarked: false },
    { title: 'Newsletter', pro: true, date: '18th of Jun 2024', bookmarked: false },
    { title: 'Gallery', pro: false, date: '23rd of Jun 2024', bookmarked: false },
  ]);

  const toggleBookmark = (index: number) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, bookmarked: !section.bookmarked } : section
      )
    );
    
    if (sections[index].bookmarked) {
      toast.success('Section removed from bookmarks');
    }
    else {
      toast.success('Section bookmarked');
    }
  };

  return (
    <SectionsContext.Provider value={{ sections, toggleBookmark }}>
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (!context) {
    throw new Error('useSections must be used within a SectionsProvider');
  }
  return context;
};