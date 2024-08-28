import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Badge,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type TagType = "date" | "text" | "checkbox" | "number" | "priority";

interface Tag {
  type: TagType;
  content: string | number | boolean | Date;
}

interface TagManagerProps {
  documentId: Id<"documents">;
  existingTags: string | undefined;
}

const TagManager: React.FC<TagManagerProps> = ({
  documentId,
  existingTags,
}) => {
  const [selectedType, setSelectedType] = useState<TagType | null>(null);
  const updateDocument = useMutation(api.documents.update);

  // For check boxes

  const parseTags = (tagsJson: string | undefined): Tag[] => {
    if (!tagsJson) return [];
    try {
      return JSON.parse(tagsJson) as Tag[];
    } catch {
      return [];
    }
  };

  const addTag = (type: TagType) => {
    let content: string | number | boolean | Date;
    switch (type) {
      case "date":
        content = new Date().toISOString();
        break;
      case "checkbox":
        content = false;
        break;
      case "number":
        content = 0;
        break;
      case "priority":
        content = "Low";
        break;
      default:
        content = "";
    }

    const newTag: Tag = { type, content };
    const currentTags = parseTags(existingTags);
    const updatedTags = [...currentTags, newTag];

    updateDocument({
      id: documentId,
      tags: JSON.stringify(updatedTags),
    });

    setSelectedType(null);
  };

  const openEditModal = (tag: Tag, index: number) => {
    // Implement logic to open an edit modal or inline edit field
  };

  const [isSelected, setIsSelected] = useState(false);

  const renderTag = (tag: Tag, index: number) => {
    let content: string;

    switch (tag.type) {
      case "date":
        content = new Date(tag.content as string).toLocaleDateString();
        break;
      case "checkbox":
        content = (tag.content as boolean) ? "✓" : "✗";
        break;
      default:
        content = String(tag.content);
    }

    return (
      <div>
        <Badge
          key={index}
          color={tag.type === "priority" ? "danger" : "primary"}
          // onClick={() => openEditModal(tag, index)}
        >
          {tag.type}: {content}
        </Badge>
        <br />
      </div>
    );
  };

  return (
    <div>
      <div className="">
        {/* <h3>Current Tags:</h3> */}
        <pre className="w-fit select-none outline-none transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2">
          {parseTags(existingTags).map((tag, index) => renderTag(tag, index))}
        </pre>
      </div>
      <div className="flex gap-2">
        <Dropdown>
          <DropdownTrigger>
            <div className="break-words flex w-fit select-none outline-none hover:bg-secondary/20 transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2">
              <pre>Add a tag</pre>
            </div>
            {/* <Button variant="light" color="secondary" radius="sm">
            Add a Tag
          </Button> */}
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => addTag(key as TagType)}>
            <DropdownItem key="date">Date</DropdownItem>
            <DropdownItem key="text">Text</DropdownItem>
            <DropdownItem key="checkbox">Checkbox</DropdownItem>
            <DropdownItem key="number">Number</DropdownItem>
            <DropdownItem key="priority">Priority</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div
          role="button"
          onClick={() => {
            updateDocument({ id: documentId, tags: "" });
          }}
          className="break-words flex w-fit select-none outline-none hover:bg-secondary/20 transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2"
        >
          <pre>Clear Tags</pre>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
