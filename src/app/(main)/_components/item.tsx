"use client";

import {
  ChevronDown,
  ChevronRight,
  CopyIcon,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash2Icon,
} from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@nextui-org/theme";
import { Skeleton } from "@nextui-org/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Kbd } from "@nextui-org/kbd";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

// Item component for displaying a document
export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  // Move document to trash
  const onArchive = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed moving to trash.",
    });
  };

  //  Handle item expansion
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  // Create a new page
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  // Determine which chevron icon to use based on the expanded state
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 6}px` : "4px",
      }}
      className={cn(
        "select-none transition-all duration-300 ease-in-out group min-h-[27px] my-1 text-md py-1 pr-3 w-full hover:bg-secondary/10 flex items-center text-muted-foreground font-medium rounded-md",
        active && "bg-secondary/5 text-secondary rounded-md"
      )}
    >
      {!!id && (
        <div // Expand button
          role="button"
          className="transition-all duration-300 ease-in-out h-full p-1 rounded-md opacity-0 group-hover:opacity-90 hover:bg-secondary-200 dark:hover:bg-secondary-200"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 pl-[3px] pr-[3px] mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        // <kbd className="ml-auto pointer-events-none inline-flex select-none h-5 items-center rounded border  bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        //   <span className="text-xs pr-1">⌘ K</span>
        // </kbd>
        <Kbd
          className="ml-auto pointer-events-none inline-flex select-none"
          keys={["command"]}
        >
          K
        </Kbd>
      )}
      {/* Buttons that are shown next to document item */}
      {!!id && (
        <div className=" ml-auto flex items-center gap-x-2">
          <Dropdown className="select-none">
            <DropdownTrigger>
              <div
                role="button"
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-90 h-full ml-auto rounded-md p-1 hover:bg-secondary-200 dark:hover:bg-secondary-200"
              >
                <MoreHorizontal size={18} />
              </div>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
              <DropdownItem showDivider isDisabled>
                Last Edited By: {user?.username}
              </DropdownItem>
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                startContent={<CopyIcon />}
              >
                Copy link
              </DropdownItem>
              <DropdownItem
                onClick={onArchive as React.MouseEventHandler<HTMLElement>}
                key="delete"
                className="text-danger"
                color="danger"
                shortcut="⌘⇧D"
                startContent={<Trash2Icon />}
              >
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div // Create note button
            role="button"
            onClick={onCreate}
            className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-90 h-full ml-auto rounded-md p-1 hover:bg-secondary-200 dark:hover:bg-secondary-200"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

// Item Skeleton component for loading state
Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py[3px] p-1"
    >
      <Skeleton className="h-4 w-4 " />
      <Skeleton className="h-4 w-[30%] " />
    </div>
  );
};
