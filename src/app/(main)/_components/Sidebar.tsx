"use client";

import { UserButton } from "@clerk/nextjs";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { useMutation } from "convex/react";
import {
  Calendar,
  ChevronDown,
  HomeIcon,
  PlusCircle,
  Search,
  SearchIcon,
  Settings2Icon,
  Trash2Icon,
  House,
  CalendarDays,
  Settings,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Item } from "./item";
import { useRouter } from "next/navigation";
import { DocumentList } from "./document-list";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/search-hook";
import { useSidebar } from "../contexts/SidebarContext";

export const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const search = useSearch();

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <>
      <aside
        className={`bg-background text-foreground fixed top-0 left-0 h-full z-50 transition-transform duration-300 transform ${isCollapsed ? "-translate-x-full" : "translate-x-0"} w-72`}
      >
        <Card
          shadow="lg"
          isHoverable
          className="h-full shadow-lg bg-opacity-80 backdrop-blur-lg"
        >
          <div className="p-4 h-full flex flex-col">
            <Card shadow="lg" className="mb-4 bg-opacity-90 backdrop-blur-lg">
              <CardBody className="flex-row items-center justify-center">
                <UserButton />
                <p className="ml-2 select-none font-medium text-base">
                  Workspace
                </p>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="secondary"
                  className="ml-auto"
                >
                  <ChevronDown />
                </Button>
              </CardBody>
            </Card>
            <div>
              <Card className="bg-opacity-90 backdrop-blur-lg">
                <CardBody className="flex flex-col">
                  {/* <Button variant="light" className="justify-start">
                    <SearchIcon size={16} />
                    <p className="select-none">Search</p>
                  </Button> */}
                  <Button
                    onClick={() => router.push("/documents")}
                    variant="light"
                    className="justify-start"
                  >
                    <HomeIcon size={20} />
                    <p className="select-none font-medium text-base">Home</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <CalendarDays size={20} />
                    <p className="select-none font-medium text-base">
                      Calendar
                    </p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <Settings size={20} />
                    <p className="select-none font-medium text-base">
                      Settings
                    </p>
                  </Button>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-4" />

            <Card className="bg-opacity-90 backdrop-blur-lg">
              <CardBody>
                {/* <Button onClick={onCreate} variant="flat" color="secondary">
                  <PlusCircle size={18} />
                  New Note
                </Button> */}
                <div className="space-y-1">
                  <Item
                    label="Search"
                    icon={Search}
                    isSearch
                    onClick={search.onOpen}
                  />
                  <Item
                    onClick={handleCreate}
                    label="New Page"
                    icon={PlusCircle}
                  />
                </div>
                <div className="mt-4">
                  <DocumentList />
                </div>
              </CardBody>
            </Card>
            <div className="absolute inset-x-0 bottom-0 m-4">
              <Divider className="my-4" />
              <Card shadow="lg" className="bg-opacity-90 backdrop-blur-lg">
                <CardBody>
                  <Popover
                    backdrop="blur"
                    placement="top"
                    className="select-none"
                  >
                    <PopoverTrigger>
                      <Button
                        variant="shadow"
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
