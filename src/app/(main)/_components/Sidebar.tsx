import React from "react";
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
  CircleUser,
  FileText,
  HomeIcon,
  Plus,
  Search,
  SearchIcon,
  Settings2Icon,
  SettingsIcon,
  Trash2,
} from "lucide-react";

interface SidebarProps {
  documents: Array<{ _id: string; title: string }>;
  onSelectDocument: (id: string) => void;
  onCreateDocument: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  onSelectDocument,
  onCreateDocument,
}) => {
  return (
    <>
      <aside className="w-60 h-screen border-r border-divider flex flex-col h-full">
        <ScrollShadow className="h-full">
          <div className="p-4 h-full relative">
            <Card isBlurred shadow="lg" className="mb-4">
              <CardBody className="flex-row items-center justify-center">
                <CircleUser size={20} className="mr-1" />
                <p className="ml-1 select-none">Workspace</p>
                <Button
                  isIconOnly
                  size="sm"
                  variant="faded"
                  className="ml-auto"
                >
                  <ChevronDown />
                </Button>
              </CardBody>
            </Card>

            <div className="space-y-4 ">
              <Card>
                <CardBody className="flex space-y-2">
                  <Button variant="light" className="justify-start">
                    <SearchIcon size={16} />
                    <p className="select-none">Search</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <HomeIcon size={16} />
                    <p className="select-none">Home</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <Calendar size={16} />
                    <p className="select-none">Clalendar</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <Settings2Icon size={16} />
                    <p className="select-none">Settings</p>
                  </Button>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-4" />

            <div className="h-full ">  
            <Card>
              <CardBody>
                Title
              </CardBody>
            </Card>
            </div>
            <div className="absolute inset-x-0 bottom-0 m-4">
            <Divider className="my-4" />
              <Card>
                <CardBody>
                <Button variant="light" className="justify-start">
                  <Trash2 size={16} />
                  <p className="select-none">Trash</p>
              </Button>
                </CardBody>
              </Card>
            </div>
            {/* <Button
            onPress={onCreateDocument}
            startContent={<Plus size={18} />}
            className="mb-4 w-full"
            >
            New Document
            </Button>
            {documents.map((doc) => (
            <Button
            key={doc._id}
              onPress={() => onSelectDocument(doc._id)}
              startContent={<FileText size={18} />}
              className="mb-2 w-full justify-start"
              variant="light"
              >
              {doc.title}
              </Button>
              ))} */}
          </div>
        </ScrollShadow>
      </aside>
    </>
  );
};
