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
          <div className="p-4">
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
