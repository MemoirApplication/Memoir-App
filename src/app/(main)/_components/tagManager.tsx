import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  cn,
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<{
    tag: Tag;
    index: number;
  } | null>(null);
  const [editContent, setEditContent] = useState<string>("");
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
    setEditingTag({ tag, index });
    setEditContent(String(tag.content));
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTag(null);
    setEditContent("");
  };

  const saveEditedTag = () => {
    if (!editingTag) return;

    const currentTags = parseTags(existingTags);
    const updatedTags = [...currentTags];

    let newContent: string | number | boolean | Date = editContent;
    switch (editingTag.tag.type) {
      case "date":
        newContent = new Date(editContent).toISOString();
        break;
      case "checkbox":
        newContent = editContent.toLowerCase() === "true";
        break;
      case "number":
        newContent = Number(editContent);
        break;
    }

    updatedTags[editingTag.index] = {
      ...editingTag.tag,
      content: newContent,
    };

    updateDocument({
      id: documentId,
      tags: JSON.stringify(updatedTags),
    });

    closeEditModal();
  };

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
      <div className="flex">
        <div className="py-1">{tag.type}:</div>
        <div
          key={index}
          role="button"
          className={cn(
            "ml-2",
            "hover:bg-secondary/25",
            "transition-all",
            "ease-in-out",
            "duration-300",
            "rounded-md",
            "py-1",
            "px-2",
            "flex"
          )}
          onClick={() => openEditModal(tag, index)}
        >
          {tag.type === "priority" && (
            <div
              className={cn(
                "rounded-lg",
                "p-1",
                tag.type === "priority" && tag.content === "High"
                  ? "bg-rose-500"
                  : "",
                tag.type === "priority" && tag.content === "Medium"
                  ? "bg-amber-500"
                  : "",
                tag.type === "priority" && tag.content === "Low"
                  ? "bg-sky-500"
                  : ""
              )}
            />
          )}
          {content}
        </div>
      </div>
    );
  };

  const renderEditInput = () => {
    if (!editingTag) return null;

    switch (editingTag.tag.type) {
      case "date":
        return (
          <Input
            type="date"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        );
      case "checkbox":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button>{editContent}</Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => setEditContent(key as string)}>
              <DropdownItem key="true">True</DropdownItem>
              <DropdownItem key="false">False</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      case "number":
        return (
          <Input
            type="number"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        );
      case "priority":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button>{editContent}</Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => setEditContent(key as string)}>
              <DropdownItem key="Low">Low</DropdownItem>
              <DropdownItem key="Medium">Medium</DropdownItem>
              <DropdownItem key="High">High</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return (
          <Input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        );
    }
  };

  return (
    <div>
      <div className="">
        {/* <h3>Current Tags:</h3> */}
        <pre className="w-fit select-none outline-none transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2">
          {parseTags(existingTags).map((tag, index) => renderTag(tag, index))}
        </pre>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalContent>
          <ModalHeader>Edit Tag</ModalHeader>
          <ModalBody>{renderEditInput()}</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeEditModal}>
              Cancel
            </Button>
            <Button color="primary" onPress={saveEditedTag}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
