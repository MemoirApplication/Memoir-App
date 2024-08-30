import React, { useState, useEffect, useCallback, SetStateAction } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  cn,
  DatePicker,
  CalendarDate,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { format } from "date-fns";
import { useLocalization } from "../contexts/LocalizationContext";

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
  const [editingTag, setEditingTag] = useState<{
    tag: Tag;
    index: number;
  } | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const updateDocument = useMutation(api.documents.update);
  const { dict } = useLocalization();

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
  };

  const openEditPopover = (tag: Tag, index: number) => {
    setEditingTag({ tag, index });
    setEditContent(String(tag.content));
  };

  const closeEditPopover = () => {
    setEditingTag(null);
    setEditContent("");
  };

  const saveEditedTag = useCallback(() => {
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
  }, [editingTag, editContent, existingTags, documentId, updateDocument]);

  useEffect(() => {
    if (editingTag) {
      saveEditedTag();
    }
  }, [editingTag, saveEditedTag, editContent]);

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
      <Popover
        key={index}
        onOpenChange={(isOpen) => !isOpen && closeEditPopover()}
      >
        <PopoverTrigger>
          <div className="flex">
            <div className="py-1">{tag.type}:</div>
            <div
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
              onClick={() => openEditPopover(tag, index)}
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
        </PopoverTrigger>
        <PopoverContent>{renderEditInput()}</PopoverContent>
      </Popover>
    );
  };

  const renderEditInput = () => {
    if (!editingTag) return null;

    switch (editingTag.tag.type) {
      case "date":
        return (
          // <Input
          //   type="date"
          //   value={editContent}
          //   onChange={(e) => setEditContent(e.target.value)}
          // />
          <DatePicker
            variant="faded"
            label="Pick a Date"
            className="max-w-[484px]"
            onChange={(e) => setEditContent(e.toString())}
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
              <DropdownItem key="Low">
              {dict.components.tagManager.low}
              </DropdownItem>
              <DropdownItem key="Medium">
              {dict.components.tagManager.medium}
              </DropdownItem>
              <DropdownItem key="High">
              {dict.components.tagManager.high}
              </DropdownItem>
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
        <pre className="w-fit select-none outline-none transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2">
          {parseTags(existingTags).map((tag, index) => renderTag(tag, index))}
        </pre>
      </div>

      <div className="flex gap-2">
        <Dropdown>
          <DropdownTrigger>
            <div className="break-words flex w-fit select-none outline-none hover:bg-secondary/20 transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2">
              <pre>
              {dict.components.tagManager.addTag}
              </pre>
            </div>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => addTag(key as TagType)}>
            <DropdownItem key="date">
            {dict.components.tagManager.date}
            </DropdownItem>
            <DropdownItem key="text">
            {dict.components.tagManager.text}
            </DropdownItem>
            <DropdownItem key="checkbox">
            {dict.components.tagManager.checkbox}
            </DropdownItem>
            <DropdownItem key="number">
            {dict.components.tagManager.number}
            </DropdownItem>
            <DropdownItem key="priority">
            {dict.components.tagManager.priority}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div
          role="button"
          onClick={() => {
            updateDocument({ id: documentId, tags: "" });
          }}
          className="break-words flex w-fit select-none outline-none hover:bg-secondary/20 transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md py-1 px-2"
        >
          <pre>
          {dict.components.tagManager.cleartags}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
