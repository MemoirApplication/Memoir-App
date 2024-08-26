import React, { useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { useLanguage } from "@/app/(main)/contexts/LanguageContext";  // Import the language context

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();  // Use the language context to get/set language
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([language]));  // Initialize with current language

  // Update selectedKeys when the language changes
  useEffect(() => {
    setSelectedKeys(new Set([language]));
  }, [language]);

  // Handle selection change and update the language
  const handleSelectionChange = (keys: Selection) => {
    const selectedLanguage = Array.from(keys).join("") || "en";  // Failsafe to 'en' if no valid key is selected
    setLanguage(selectedLanguage);  // Update the language in the context
    console.log("set the language to", selectedLanguage)
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
        >
          {Array.from(selectedKeys).join(", ").replaceAll("_", " ")}  {/* Display the selected language */}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}  // Trigger language change
      >
        <DropdownItem key="en">English</DropdownItem>
        <DropdownItem key="ar">Arabic</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
