"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import * as LucideIcons from 'lucide-react';
import iconSvgs from './iconSvgs';

// Create context for icon system
const IconContext = createContext({
  getIcon: () => null,
  loadIconLibrary: () => Promise.resolve(),
  uploadCustomIcon: () => {},
  customIcons: [],
  isDarkMode: false, // Add default value
});

// Icon libraries configuration
const iconLibraries = {
  lucide: {
    loaded: true, // Pre-loaded
    icons: LucideIcons,
  },
  iconify: {
    loaded: true, // Changed to true since we'll handle availability differently
    collections: {
      'simple-icons': { loaded: false },
      'heroicons': { loaded: false },
      'ph': { loaded: false },
      'devicon': { loaded: false },
      'fa': { loaded: false },
      'material-symbols': { loaded: false },
    }
  },
  custom: {
    loaded: true,
    icons: {},
  }
};

export function IconProvider({ children }) {
  const [libraries, setLibraries] = useState(iconLibraries);
  const [customIcons, setCustomIcons] = useState([]);
  // Initialize with false and use useEffect for client-side updates
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode only on the client side
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Set the initial dark mode state
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Load an iconify library dynamically
  const loadIconLibrary = async (library, collection = null) => {
    try {
      if (library === 'iconify' && collection) {
        if (!libraries.iconify.collections[collection]?.loaded) {
          // Instead of dynamic import, mark the collection as loaded
          // This assumes the collection is already installed via npm
          setLibraries(prev => ({
            ...prev,
            iconify: {
              ...prev.iconify,
              loaded: true,
              collections: {
                ...prev.iconify.collections,
                [collection]: { loaded: true }
              }
            }
          }));
          return true;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Failed to load icon library ${library}/${collection}:`, error);
      return false;
    }
  };

  // Get icon component based on type and name
  const getIcon = (type, name, props = {}) => {
    try {
      // Handle Lucide icons
      if (type === 'lucide' && libraries.lucide.loaded) {
        const LucideIcon = libraries.lucide.icons[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
      }
      
      // Handle Iconify icons
      if (type === 'iconify') {
        const collection = props.collection || 'simple-icons';
        return <Icon icon={`${collection}:${name}`} {...props} />;
      }
      
      // Handle SVG icons from iconSvgs
      if (type === 'svg') {
        const svgContent = iconSvgs[name] || iconSvgs['default'];
        return (
          <div 
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        );
      }
      
      // Handle custom uploaded icons
      if (type === 'custom') {
        const customIcon = libraries.custom.icons[name];
        if (customIcon) {
          return (
            <div 
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: customIcon.svg }} 
            />
          );
        }
      }
      
      // Fallback to default icon
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </div>
      );
    } catch (error) {
      console.error(`Error rendering icon ${type}/${name}:`, error);
      // Return fallback icon on error
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
      );
    }
  };

  // Handle custom SVG icon uploads
  const uploadCustomIcon = (name, svgContent) => {
    try {
      // Basic validation
      if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
        throw new Error('Invalid SVG content');
      }

      // Add the custom icon
      setLibraries(prev => ({
        ...prev,
        custom: {
          ...prev.custom,
          icons: {
            ...prev.custom.icons,
            [name]: { svg: svgContent }
          }
        }
      }));

      // Update custom icons list
      setCustomIcons(prev => [...prev, { name, type: 'custom' }]);
      
      return true;
    } catch (error) {
      console.error('Error uploading custom icon:', error);
      return false;
    }
  };

  const value = {
    getIcon,
    loadIconLibrary,
    uploadCustomIcon,
    customIcons,
    // Only provide isDarkMode when it's been determined on the client
    isDarkMode: isDarkMode,
  };

  return (
    <IconContext.Provider value={value}>
      {children}
    </IconContext.Provider>
  );
}

export const useIcons = () => useContext(IconContext);