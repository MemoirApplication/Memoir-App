"use client";

import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

import { useMutation } from "convex/react";
import { useRef, useState } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";

interface TitleProps {
  initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData.title || "Untitled");

  const enabaleInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center gap-x-2">
      {!!initialData && <p className="text-xl" >{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enabaleInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="p-0 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enabaleInput}
          size="sm"
          variant="light"
          className="font-medium h-auto p-1 text-base justify-start"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-16 rounded-md" />;
};
