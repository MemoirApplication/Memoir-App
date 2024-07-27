"use client";

import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import {
  Calendar,
  ChevronDown,
  CircleUser,
  HomeIcon,
  SearchIcon,
  Settings2Icon,
  Trash2Icon,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <>
      <aside className="h-full h-screen border-r  w-60 bg-secondary ">
        <div className="p-4 h-full">
          <Card isBlurred shadow="lg" className="mb-4">
            <CardBody className="flex-row items-center justify-center">
              <CircleUser size={20} className="mr-1" />
              <p className="ml-1 select-none">Workspace</p>
              <Button isIconOnly size="sm" variant="faded" className="ml-auto">
                <ChevronDown />
              </Button>
            </CardBody>
          </Card>
          <div>
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
          <div className="aboslute inset-x-0 bottom-0">
            <Card className="align-bottom">
              <CardBody>
                <Button variant="light" className="justify-start ">
                  <Trash2Icon size={16} />
                  Trash
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </aside>
    </>
  );
};
