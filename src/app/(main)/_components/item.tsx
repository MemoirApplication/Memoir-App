"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
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
import { useLocalization } from "../contexts/LocalizationContext";

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
  const { dict } = useLocalization();

  // Move document to trash
  const onArchive = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id });
    toast.promise(promise, {
      loading: dict.main.components.item.toastArchiveLoading,
      success: dict.main.components.item.toastArchiveSuccess,
      error: dict.main.components.item.toastArchiveError,
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
      loading: dict.main.components.item.toastCreateLoading,
      success: dict.main.components.item.toastCreateSuccess,
      error: dict.main.components.item.toastCreateError,
    });
  };

  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  // Determine which chevron icon to use based on the expanded state
  const ChevronIcon = expanded
    ? ChevronDown // If expanded, show down chevron
    : isRTL
      ? ChevronLeft // Use left chevron in RTL mode
      : ChevronRight; // Use right chevron in LTR mode

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingInlineStart: level ? `${level * 12 + 6}px` : "8px",
      }}
      className={cn(
        "select-none transition-all duration-300 ease-in-out group min-h-[27px] my-1 text-md py-1.5 pe-2 w-full hover:bg-secondary/10 flex items-center text-muted-foreground font-medium rounded-xl",
        active && "bg-secondary/5 text-secondary"
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
        <div className="shrink-0 ps-[3px] pe-[3px] me-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] me-2 text-muted-foreground" />
      )}
      <span dir="auto" className="truncate">{label}</span>
      {isSearch && (
        // <kbd className="ms-auto pointer-events-none inline-flex select-none h-5 items-center rounded border  bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        //   <span className="text-xs pe-1">⌘ K</span>
        // </kbd>
        <Kbd
          className="ms-auto pointer-events-none inline-flex select-none"
          keys={["command"]}
        >
          K
        </Kbd>
      )}
      {/* Buttons that are shown next to document item */}
      {!!id && (
        <div className=" ms-auto flex items-center gap-x-2">
          <Dropdown className="select-none">
            <DropdownTrigger>
              <div
                role="button"
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-90 h-full ms-auto rounded-md p-1 hover:bg-secondary-200 dark:hover:bg-secondary-200"
              >
                <MoreHorizontal size={18} />
              </div>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
              <DropdownItem showDivider isDisabled>
                {dict.main.components.item.lastEdited}
                {user?.username}
              </DropdownItem>
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                startContent={<CopyIcon />}
              >
                {dict.main.components.item.copyLink}
              </DropdownItem>
              <DropdownItem
                onClick={onArchive as React.MouseEventHandler<HTMLElement>}
                key="delete"
                className="text-danger"
                color="danger"
                shortcut="⌘⇧D"
                startContent={<Trash2Icon />}
              >
                {dict.main.components.item.archive}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div // Create note button
            role="button"
            onClick={onCreate}
            className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-90 h-full ms-auto rounded-md p-1 hover:bg-secondary-200 dark:hover:bg-secondary-200"
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
      style={{
        paddingInlineStart: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px] p-1"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
