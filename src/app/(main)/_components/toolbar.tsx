"use client";

import { IconPicer } from "../../../components/icon-picker";
import { Button } from "@nextui-org/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, ReactNode, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";
import { format, formatDistanceToNow } from "date-fns";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Divider } from "@nextui-org/divider";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isTitleEditing, setTitleIsEditing] = useState(false);
  const [isCommentEditing, setCommentIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [comment, setComment] = useState(initialData.comments);

  const [currentTime, setCurrentTime] = useState(Date.now());

  const lastEditedDate = new Date(
    parseInt(initialData.lastEditedTime as string)
  );
  const formattedDate = format(lastEditedDate, "MMM dd, yyyy HH:mm");
  const timeAgo = formatDistanceToNow(lastEditedDate, { addSuffix: true });

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  // Enable editing mode for the document title
  const enableTitleInput = () => {
    if (preview) return; // Do not allow editing in preview mode
    setTitleIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title); // Set the initial title value
      inputRef.current?.focus();
    }, 0);
  };
  // Enable editing mode for the comment
  const enableInputComment = () => {
    if (preview) return; // Do not allow editing in preview mode
    setCommentIsEditing(true);
    setTimeout(() => {
      setComment(initialData.comments); // Set the initial comment value
      inputRef.current?.focus();
    }, 0);
  };

  // Disable editing mode for the title
  const disableTitleInput = () => {
    setTitleIsEditing(false);
  };
  // Disable editing mode for the comment
  const disableCommentInput = () => {
    setCommentIsEditing(false);
  };

  // Update the document title
  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };
  // Update the document comment
  const onInputComment = (value: string) => {
    setComment(value);
    update({
      id: initialData._id,
      comments: value,
    });
  };

  // Handle Enter key press to save and exit editing mode
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableCommentInput();
      disableTitleInput();
    }
  };

  // Update the document icon
  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  // Remove the document icon
  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };

  // TypeScript type for a tag
  type Tag = {
    type: "date" | "text" | "checkbox" | "number" | "priority";
    content: string | number | boolean | Date;
  };

  // When saving tags to the database
  const saveTags = (tags: Tag[]) => {
    const tagsJson = JSON.stringify(tags);
    // Now save tagsJson to the database
    update({
      id: initialData._id,
      tags: tagsJson,
    });
  };
  // Saving
  // saveTags(tags);

  // When retrieving tags from the database
  const getTags = (tagsJson: string | undefined): Tag[] => {
    if (!tagsJson) return [];
    return JSON.parse(tagsJson) as Tag[];
  };

  // Example usage
  const tags: Tag[] = [
    { type: "date", content: new Date() },
    { type: "text", content: "Important" },
    { type: "checkbox", content: true },
    { type: "number", content: 5 },
    { type: "priority", content: "High" },
  ];

  // Retrieving
  const retrievedTags = getTags(initialData.tags);

  const TagComponent: React.FC<{ tag: Tag }> = ({ tag }) => {
    switch (tag.type) {
      case "date":
        return (
          <pre>
            Pick a Date {new Date(tag.content as string).toLocaleDateString()}
          </pre>
        );
      case "text":
        return <pre>{tag.content as string}</pre>;
      case "checkbox":
        return (
          <input type="checkbox" checked={tag.content as boolean} readOnly />
        );
      case "number":
        return <pre>{tag.content as number}</pre>;
      case "priority":
        return (
          <pre className={`priority-${tag.content}`}>
            {tag.content as string}
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" px-[54px] group relative">
      {/* Display icon picker and remove icon button if an icon is set and not in preview mode */}
      {!!initialData.icon && !preview && (
        <div className="select-none flex items-center gap-x-2 group/icon pt-6">
          <IconPicer onChange={onIconSelect}>
            <p role="button" className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicer>
          <Button
            isIconOnly
            onClick={onRemoveIcon}
            className=" rounded=full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="ghost"
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Display icon if set and in preview mode */}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      {/* Display icon picker and cover image button if no icon or cover image is set and not in preview mode */}
      <div className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicer asChild onChange={onIconSelect}>
            <Button variant="ghost" className="text-muted-foreground text-xs">
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicer>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            variant="ghost"
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>

      {/* Display text area for editing title or static title display */}
      {isTitleEditing && !preview ? (
        <div>
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableTitleInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="w-full mb-2 text-6xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] resize-none "
          />
          <br />
        </div>
      ) : (
        <div
          onClick={enableTitleInput}
          className="pb-[11.5px] mb-2 text-6xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] "
        >
          {initialData.title}
          <br />
        </div>
      )}

      {/* Display text area for editing comment or static comment display */}
      {isCommentEditing && !preview ? (
        <div>
          <pre>
            <TextareaAutosize
              ref={inputRef}
              onBlur={disableCommentInput}
              onKeyDown={onKeyDown}
              value={comment}
              onChange={(e) => onInputComment(e.target.value)}
              className="py-[11.5px] w-full bg-transparent break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] resize-none "
            />
          </pre>
        </div>
      ) : (
        <div
          onClick={enableInputComment}
          className="break-words flex w-fit select-none outline-none hover:bg-secondary/20 transition-all duration-300 ease-in-out  text-[#707070] dark:text-[#b6b6b6] rounded-md p-2"
        >
          <pre>
            {initialData.comments
              ? "Comment: " + initialData.comments
              : "Add a comment"}
          </pre>
        </div>
      )}

      {/* To-Do Display document tags */}

      {/* <Dropdown>
        <DropdownTrigger>
          <Button size="sm" radius="sm" variant="light" color="secondary">
            Add a tag
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem></DropdownItem>
          <DropdownSection></DropdownSection>
        </DropdownMenu>
      </Dropdown> */}
      {retrievedTags.map((tag) => (
        <TagComponent key={tag.type} tag={tag} />
      ))}
      <pre className="break-words select-none outline-none text-[#707070] dark:text-[#b6b6b6] p-2">
        Last edited time: {formattedDate}, {timeAgo}
        <Divider className="my-2" />
      </pre>
    </div>
  );
};
