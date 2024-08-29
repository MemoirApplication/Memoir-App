"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Divider,
} from "@nextui-org/react";
import { Sun, Moon } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { useTheme } from "next-themes";
import ColorSwitcher from "@/components/ColorSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalization } from "@/app/(main)/contexts/LocalizationContext";

export const SettingsModal = () => {
  const settings = useSettings();
  const { theme, setTheme } = useTheme();
  const { dict } = useLocalization();
  const isDarkMode = theme === "dark";
  const themeButtonText = isDarkMode
    ? dict.landingPage.components.navbar.dark
    : dict.landingPage.components.navbar.light;
  return (
    <Modal
      backdrop="blur"
      isOpen={settings.isOpen}
      onOpenChange={settings.onClose}
    >
      <ModalContent>
        <div className="p-4 mb-2">
          <p className="text-2xl font-bold select-none text-foregroundt">
            {dict.main.components.Sidebar.settings}
          </p>
          <Divider className="my-2" />
          <div className="font-medium select-none py-1">
            {dict.main.components.Sidebar.color}
          </div>
          <div>
            <ColorSwitcher />
          </div>
          <div className="font-medium select-none py-1">
            {dict.main.components.Sidebar.theme}
          </div>
          <Dropdown className="justify-start items-start">
            <DropdownTrigger>
              <Button variant="bordered" color="default">
                {themeButtonText}
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown Menu with icons">
              <DropdownItem
                className="text-foreground "
                variant="faded"
                key="dark"
                startContent={<Moon />}
                onClick={() => setTheme("dark")}
              >
                {dict.landingPage.components.navbar.dark}
              </DropdownItem>
              <DropdownItem
                className="text-foreground "
                variant="faded"
                key="light"
                startContent={<Sun />}
                onClick={() => setTheme("light")}
              >
                {dict.landingPage.components.navbar.light}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="font-medium select-none py-1">
            {dict.main.components.Sidebar.language}
          </div>
          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
