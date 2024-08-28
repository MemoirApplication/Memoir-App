import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the context data
type LanguageContextType = {
  language: string; // Current language
  setLanguage: (language: string) => void; // Function to update the language
};

type LanguageType = "en" | "ar" | "jp"; // Define the supported languages

// Create a context with an undefined default value
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Custom hook to use the LanguageContext
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Error thrown if useLanguage is used outside of a LanguageProvider
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Props for the LanguageProvider component
type LanguageProviderProps = {
  children: ReactNode; // Children components to be rendered within the provider
};

// LanguageProvider component to provide language context to its children
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // State to hold the current language
  const [language, setLanguage] = useState<string | null>(null); // Default to English

  useEffect(() => {
    // Load language preference from local storage
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        setLanguage(storedLanguage);
        const languageDirectionMap: Record<LanguageType, string> = {
          en: "ltr",
          ar: "rtl",
          jp: "ltr",
        };
      
        const dir = languageDirectionMap[storedLanguage as LanguageType] || "ltr";
        document.documentElement.setAttribute("dir", dir);
      } else {
        setLanguage("en");
      }
    }
  }, []);

  useEffect(() => {
    // Save language preference to local storage whenever it changes
    if (typeof window !== "undefined" && language !== null) {
      localStorage.setItem("selectedLanguage", language);
    }
  }, [language]);

  // Show nothing or a loading spinner while the language is being initialized
  if (language === null) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

