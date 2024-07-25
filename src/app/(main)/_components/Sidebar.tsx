import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
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
    <div className="w-64 h-screen bg-gray-100 p-4">
      <button
        onClick={onCreateDocument}
        className="flex items-center mb-4 text-blue-600"
      >
        <Plus size={24} />
        <span className="ml-2">New Document</span>
      </button>
      <Listbox
        aria-label="Document list"
        onAction={(key) => onSelectDocument(key as string)}
      >
        {documents.map((doc) => (
          <ListboxItem key={doc._id} startContent={<FileText size={24} />}>
            {doc.title}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};
