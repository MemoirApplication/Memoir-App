import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { useLanguage } from "@/app/(main)/contexts/LanguageContext"; // Import the language context

type LanguageType = "en" | "ar"; // Define the supported languages

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage(); // Use the language context to get/set language
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([language])
  ); // Initialize with current language

  // Mapping language to direction (ltr/rtl)
  const languageDirectionMap: Record<LanguageType, string> = {
    en: "ltr",
    ar: "rtl",
  };

  // Define a mapping from language codes to names
  const languageOptions = [
    { key: "en", name: "English" },
    { key: "ar", name: "Arabic" },
    // Add more languages as needed
  ];

  // Get the name of the currently selected language
  const selectedLanguageName =
    languageOptions.find((option) => option.key === language)?.name ||
    "Select Language";
  // Update selectedKeys when the language changes

  useEffect(() => {
    setSelectedKeys(new Set([language]));

    // Set the 'dir' attribute based on the selected language
    const dir = languageDirectionMap[language as LanguageType] || "ltr"; // Default to 'ltr' if language is not mapped
    document.documentElement.setAttribute("dir", dir);
  }, [language]);

  // Handle selection change and update the language
  const handleSelectionChange = (keys: Selection) => {
    const selectedLanguage = Array.from(keys).join("") || "en"; // Failsafe to 'en' if no valid key is selected
    setLanguage(selectedLanguage); // Update the language in the context
    localStorage.setItem("selectedLanguage", selectedLanguage); // Save to local storage
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedLanguageName}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange} // Trigger language change
      >
        <DropdownItem key="en">English</DropdownItem>
        <DropdownItem key="ar">Arabic</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
