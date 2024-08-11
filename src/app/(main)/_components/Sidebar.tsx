"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
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
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export const Sidebar = () => {
  const { isCollapsed } = useSidebar(); // Use sidebar context to determine if sidebar is collapsed
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const search = useSearch();

  // Create a new note
  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  // Create a state variable with today's date
  const today = new Date().toISOString().split("T")[0]; // Gets today's date in "YYYY-MM-DD" format
  let [value, setValue] = React.useState(parseDate(today));

  const { user } = useUser();

  return (
    <>
      <aside
        className={`bg-background text-foreground fixed top-0 left-0 h-full z-50 transition-transform duration-300 transform ${isCollapsed ? "-translate-x-full" : "translate-x-0"} w-72`}
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
              className="mb-4 bg-opacity-20 backdrop-blur-lg h-28"
            >
              <CardBody className="flex-row items-center justify-center">
                <UserButton />
                <p className="ml-2 select-none font-medium text-base">
                  {user?.username}'s workspace
                </p>
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Button // Workspace button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="secondary"
                      className="ml-auto"
                    >
                      <ChevronDown />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="font-medium">Theme:</div>
                      <div>
                        <ColorSwitcher />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardBody>
            </Card>

            {/* Home, Calendar and Settings card */}
            <div>
              <Card className="bg-opacity-20 backdrop-blur-lg">
                <CardBody className="flex flex-col">
                  {/* <Button variant="light" className="justify-start">
                    <SearchIcon size={16} />
                    <p className="select-none">Search</p>
                  </Button> */}

                  <Button // Home button
                    onClick={() => router.push("/documents")}
                    variant="light"
                    className="justify-start"
                  >
                    <HomeIcon size={20} />
                    <p className="select-none font-medium text-base">Home</p>
                  </Button>

                  {/* Popover to show the calendar */}
                  <Popover shadow="lg" backdrop="blur" placement="right">
                    <PopoverTrigger>
                      <Button // Calendar button
                        variant="light"
                        className="justify-start"
                      >
                        <CalendarDays size={20} />
                        <p className="select-none font-medium text-base">
                          Calendar
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
                    variant="light"
                    className="justify-start"
                  >
                    <Settings size={20} />
                    <p className="select-none font-medium text-base">
                      Settings
                    </p>
                  </Button>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-4" />

            {/* Search and Documents card */}
            <Card className="bg-opacity-20 backdrop-blur-lg h-full">
              <CardBody>
                <ScrollShadow className="h-full">
                  <SimpleBar>
                    {/* <Button onClick={onCreate} variant="flat" color="secondary">
                  <PlusCircle size={18} />
                  New Note
                </Button> */}
                    <div className="space-y-1">
                      <Item // Search button
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen} // Calls search.onOpen when pressed
                      />
                      <Item // New page button
                        onClick={handleCreate} // Calls handleCreate when pressed
                        label="New Page"
                        icon={PlusCircle}
                      />
                    </div>
                    <div className="mt-4">
                      {/* Document list component */}
                      <DocumentList />

                      <Divider className="mt-1" />

                      {/* Favorites section */}
                      <p className="flex ml-2 mt-4 mb-2 font-medium">
                        <Star size={20} className="mr-2" />
                        Favorites
                      </p>
                      <FavDocumentList />
                    </div>
                  </SimpleBar>
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
                        variant="solid"
                        color="secondary"
                        className="justify-start "
                      >
                        <Trash2Icon size={16} />
                        Trash
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
