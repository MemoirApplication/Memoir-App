import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data
type ColorContextType = {
  color: string; // Current color theme
  setColor: (color: string) => void; // Function to update the color
};

// Create a context with an undefined default value
const ColorContext = createContext<ColorContextType | undefined>(undefined);

// Custom hook to use the ColorContext
export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    // Error thrown if useColor is used outside of a ColorProvider
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};

// Props for the ColorProvider component
type ColorProviderProps = {
  children: ReactNode; // Children components to be rendered within the provider
};

// ColorProvider component to provide color context to its children
export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  // State to hold the current color, initialized to 'violet'
  const [color, setColor] = useState<string>("violet");

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children} {/* Render children with access to color context */}
    </ColorContext.Provider>
  );
};
