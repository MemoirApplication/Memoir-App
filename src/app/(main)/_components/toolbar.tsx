"use client";

import { IconPicer } from "../../../components/icon-picker";
import { Button } from "@nextui-org/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  // Enable editing mode for the document title
  const enableInput = () => {
    if (preview) return; // Do not allow editing in preview mode
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title); // Set the initial title value
      inputRef.current?.focus();
    }, 0);
  };

  // Disable editing mode
  const disableInput = () => {
    setIsEditing(false);
  };

  // Update the document title
  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  // Handle Enter key press to save and exit editing mode
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
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
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="w-full text-6xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] resize-none "
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] "
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
