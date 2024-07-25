import React from "react";
import { Button, ScrollShadow } from "@nextui-org/react";
import { FileText, Plus } from "lucide-react";

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
    <div className="w-64 h-screen border-r border-divider">
      <ScrollShadow className="h-full">
        <div className="p-4">
          <Button
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
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};
