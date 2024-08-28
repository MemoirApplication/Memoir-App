"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardBody,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  HomeIcon,
  PlusCircle,
  Search,
  Trash2Icon,
  CalendarDays,
  Settings,
  Star,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Item } from "./item";
import { useRouter } from "next/navigation";
import { DocumentList } from "./document-list";
import { FavDocumentList } from "./fav-document-list";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Calendar } from "@nextui-org/react";

import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/search-hook";
import { useSidebar } from "../contexts/SidebarContext";
import React from "react";
import { parseDate } from "@internationalized/date";
import ColorSwitcher from "@/components/ColorSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalization } from "../contexts/LocalizationContext";

export const Sidebar = () => {
  const { isCollapsed } = useSidebar(); // Use sidebar context to determine if sidebar is collapsed
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const search = useSearch();
  const { dict } = useLocalization();

  // Create a new note
  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: dict.main.components.Sidebar.toastCreateLoading,
      success: dict.main.components.Sidebar.toastCreateSuccess,
      error: dict.main.components.Sidebar.toastCreateError,
    });
  };

  // Create a state variable with today's date
  const today = new Date().toISOString().split("T")[0]; // Gets today's date in "YYYY-MM-DD" format
  let [value, setValue] = React.useState(parseDate(today));
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  const { user } = useUser();

  return (
    <>
      <aside
        className={`bg-background text-foreground fixed top-0 inset-start-0 h-full z-50 transition-transform duration-300 transform ${isCollapsed ? (isRTL ? "translate-x-full" : "-translate-x-full") : "translate-x-0"} w-72`}
      >
        {/* Sidebar background and container */}
        <Card
          shadow="lg"
          // isHoverable
          radius="none"
          className="h-full shadow-lg bg-opacity-20 text-foreground backdrop-blur-lg"
        >
          <div className="p-4 h-full flex flex-col">
            {/* user and workspace card */}
            <Card
              shadow="lg"
              className="mb-4 bg-opacity-20 backdrop-blur-lg h-28"
            >
              <CardBody className="flex-row items-center justify-center">
                <UserButton />
                <p className="ms-2 select-none font-medium text-base">
                  {user?.username}
                  {dict.main.components.Sidebar.workspace}
                </p>
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Button // Workspace button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="secondary"
                      className="ms-auto"
                    >
                      <ChevronDown />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="font-medium select-none py-1">
                        {dict.main.components.Sidebar.theme}{" "}
                      </div>
                      <div>
                        <ColorSwitcher />
                      </div>
                      <div className="font-medium select-none py-1">
                        {dict.main.components.Sidebar.language}{" "}
                      </div>
                      <div>
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardBody>
            </Card>

            {/* Home, Calendar and Settings card */}
            <div>
              <Card shadow="lg" className="bg-opacity-20 backdrop-blur-lg">
                <CardBody className="flex flex-col">
                  {/* <Button variant="light" className="justify-start">
                    <SearchIcon size={16} />
                    <p className="select-none">Search</p>
                  </Button> */}

                  <Button // Home button
                    onClick={() => router.push("/documents")}
                    variant="shadow"
                    color="secondary"
                    className="justify-start my-1"
                  >
                    <HomeIcon size={20} />
                    <p className="select-none  font-medium ">
                      {dict.main.components.Sidebar.home}
                    </p>
                  </Button>

                  {/* Popover to show the calendar */}
                  <Popover shadow="lg" backdrop="blur" placement="right">
                    <PopoverTrigger>
                      <Button // Calendar button
                        variant="shadow"
                        color="secondary"
                        className="justify-start my-1"
                      >
                        <CalendarDays size={20} />
                        <p className="select-none font-medium ">
                          {dict.main.components.Sidebar.calendar}
                        </p>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        color="secondary"
                        aria-label="Date (Controlled)"
                        value={value}
                        onChange={setValue}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button // Settings button
                    color="secondary"
                    variant="shadow"
                    className="justify-start my-1"
                  >
                    <Settings size={20} />
                    <p className="select-none font-medium ">
                      {dict.main.components.Sidebar.settings}
                    </p>
                  </Button>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-4" />

            {/* Search and Documents card */}
            <Card shadow="lg" className="bg-opacity-20 backdrop-blur-lg h-full">
              <CardBody>
                <ScrollShadow className="h-full">
                  {/* <Button onClick={onCreate} variant="flat" color="secondary">
                  <PlusCircle size={18} />
                  New Note
                </Button> */}
                  <div className="space-y-1">
                    <Item // Search button
                      label={dict.main.components.Sidebar.search}
                      icon={Search}
                      isSearch
                      onClick={search.onOpen} // Calls search.onOpen when pressed
                    />
                    <Item // New page button
                      onClick={handleCreate} // Calls handleCreate when pressed
                      label={dict.main.components.Sidebar.newpage}
                      icon={PlusCircle}
                    />
                  </div>
                  <div className="mt-4">
                    {/* Document list component */}
                    <DocumentList />

                    <Divider className="mt-1" />

                    {/* Favorites section */}
                    <p className="flex ms-2 mt-4 mb-2 font-medium select-none">
                      <Star size={20} className="me-2" />
                      {dict.main.components.Sidebar.favorites}
                    </p>
                    <FavDocumentList />
                  </div>
                </ScrollShadow>
              </CardBody>
            </Card>

            {/* Trash card */}
            <div className="inset-x-0 bottom-0">
              <Divider className="my-4" />
              <Card shadow="lg" className="bg-opacity-20 backdrop-blur-lg">
                <CardBody>
                  <Popover
                    backdrop="blur"
                    placement="top"
                    className="select-none"
                  >
                    <PopoverTrigger>
                      <Button // Trash button
                        variant="shadow"
                        color="secondary"
                        className="justify-start "
                      >
                        <Trash2Icon size={20} />
                        <p className="select-none  font-medium ">
                          {dict.main.components.Sidebar.trash}
                        </p>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <TrashBox />
                    </PopoverContent>
                  </Popover>
                </CardBody>
              </Card>
            </div>
          </div>
        </Card>
      </aside>
    </>
  );
};
