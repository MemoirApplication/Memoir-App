import React, { ElementRef, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import {
  ArrowLeftToLineIcon,
  Calendar,
  Car,
  ChevronDown,
  ChevronLeft,
  CircleUser,
  FileText,
  HomeIcon,
  MenuIcon,
  Plus,
  Search,
  SearchIcon,
  Settings2Icon,
  SettingsIcon,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@nextui-org/react";

export const Sidebar = () => {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth < 400) newWidth = 400;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "h-full group/sidebar w-60 group/sidebar  bg-secondary overflow-y-auto relative flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300"
        )}
      >
        <div className="p-4 h-full">
          <Card isBlurred shadow="lg" className="mb-4">
            <CardBody className="flex-row items-center justify-center">
              {/* <div
                  role="button"
                  className={cn(
                    "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 absolute top-3 roght-2 opacity-0 group-hover/sidebar:opacity-100 transition"
                  )}
                >
                  <ChevronLeft />
                </div> */}
              <CircleUser size={20} className="mr-1" />
              <p className="ml-1 select-none">Workspace</p>
              <Button isIconOnly size="sm" variant="faded" className="ml-auto">
                <ChevronDown />
              </Button>
            </CardBody>
          </Card>

          <div className="space-y-4 ">
            <Card>
              <CardBody className="flex space-y-2">
                <Button variant="light" className="justify-start">
                  <SearchIcon size={16} />
                  <p className="select-none">Workspace</p>
                </Button>
                <Button variant="light" className="justify-start">
                  <HomeIcon size={16} />
                  <p className="select-none">Workspace</p>
                </Button>
                <Button variant="light" className="justify-start">
                  <Calendar size={16} />
                  <p className="select-none">Workspace</p>
                </Button>
                <Button variant="light" className="justify-start">
                  <Settings2Icon size={16} />
                  <p className="select-none">Workspace</p>
                </Button>
              </CardBody>
            </Card>
          </div>

          <Divider className="my-4" />

          <Card>
            <CardBody></CardBody>
          </Card>
          <Divider className="my-4" />
          <div className="align-bottom">
            <Card>
              <CardBody></CardBody>
            </Card>
          </div>
        </div>
        <div
          onMouseDown={() => {}}
          onClick={() => {}}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </>
  );
};
