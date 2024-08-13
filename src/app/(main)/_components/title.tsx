"use client";

import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

import { useMutation } from "convex/react";
import { useRef, useState } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";

interface TitleProps {
  initialData: Doc<"documents">; // Document data passed as props
}

export const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData.title || "Untitled"); // State to manage the title text

  // Enable input field for editing
  const enabaleInput = () => {
    setTitle(initialData.title); // Set the current title as the value of the input
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  // Disable input field and exit editing mode
  const disableInput = () => {
    setIsEditing(false);
  };

  // Update title state and call API mutation to update document title
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  // Handle Enter key press to exit editing mode
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  // API mutation to update document title
  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  return (
    <div className="flex items-center gap-x-2 select-none">
      {!!initialData && <p className="text-xl">{initialData.icon}</p>}
      {isEditing ? (
        <Input
          radius="sm"
          ref={inputRef}
          onClick={enabaleInput} // Enable input field on click
          onBlur={disableInput} // Disable input field when focus is lost
          onChange={onChange} // Update title on input change
          onKeyDown={onKeyDown} // Handle key down events
          value={title} // Set the input value to the current title
          className="p-0 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enabaleInput} // Enable input field on button click
          size="sm"
          variant="light"
          className="font-medium h-auto p-1 text-base justify-start"
          radius="sm"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

// Skeleton component for loading state
Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-16 rounded-md" />;
};
