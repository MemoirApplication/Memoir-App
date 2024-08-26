import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { useLanguage } from "./LanguageContext";  // Import the LanguageContext

// Define the shape of the context
type LocalizationContextType = {
  dict: any;  // The localization dictionary
};

// Create a context with an undefined default value
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Custom hook to use the LocalizationContext
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};

// Props for the LocalizationProvider component
type LocalizationProviderProps = {
  children: ReactNode;
};

// LocalizationProvider component to provide the dictionary and language context to its children
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const { language } = useLanguage();  // Get current language from the LanguageContext
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    // Fetch the dictionary whenever the language changes
    const loadDictionary = async () => {
      const dictionary = await getDictionary(language);
      console.log("Loaded dictionary:", dictionary); // Add this
      setDict(dictionary);
    };
    loadDictionary();
  }, [language]);  // Re-run when language changes

  // Show a loading spinner or nothing while the dictionary is being fetched
  if (dict === null) {
    return null;
  }

  return (
    <LocalizationContext.Provider value={{ dict }}>
      {children}
    </LocalizationContext.Provider>
  );
};
