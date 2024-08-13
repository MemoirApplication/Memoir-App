import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface EditorContextType {
  isFullWidth: boolean;
  toggleWidth: () => void;
}

// Create a default context value
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Create a provider component
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);

  const toggleWidth = () => {
    setIsFullWidth(prev => !prev);
  };

  return (
    <EditorContext.Provider value={{ isFullWidth, toggleWidth }}>
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook to use the editor context
export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
