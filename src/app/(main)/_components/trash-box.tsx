"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import {
  CircleCheckBig,
  CircleSlash2,
  Search,
  Trash,
  Undo,
} from "lucide-react";
import { Input } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

// Component for displaying and managing trashed documents
export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash); // Fetch trashed documents
  const restore = useMutation(api.documents.restore); // Mutation to restore a document
  const remove = useMutation(api.documents.remove); // Mutation to permanently remove a document

  const [search, setSearch] = useState(""); // State for search input

  // Filter documents based on the search input
  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  // Navigate to the document's page
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // Restore a document from trash
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Note restored!",
      error: "Failed restoring.",
    });
  };

  // Permanently remove a document from trash
  const onRemove = (
    // event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "Note removed!",
      error: "Failed removing.",
    });

    // Redirect if the removed document is currently open
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  // Show a spinner while documents are loading
  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" color="secondary" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      {/* Search input for filtering documents */}
      <div className="flex items-center gap-x-1 p-2">
        <Search className="mr-3" />
        <Input
          variant="faded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents in Trash.
        </p>
        {/* Render filtered documents */}
        {filterDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-md w-full hover:bg-secondary/5 flex items-center text-secondary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex  items-center">
              {/* Restore button */}
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-md p-2 hover:bg-secondary-200"
              >
                <Undo className=" h-4 w-4 text-muted-foreground" />
              </div>
              {/* Popover for permanent removal confirmation */}
              <Popover placement="top" backdrop="opaque">
                <PopoverTrigger>
                  <Button isIconOnly variant="light" color="danger">
                    <Trash className=" h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex  justify-center items-center">
                    <h2 className="text-lg mr-4 ml-2">Are you sure ?</h2>
                    {/* Button to Confirm removal */}
                    <Button
                      onClick={() => onRemove(document._id)}
                      isIconOnly
                      variant="light"
                      color="danger"
                      className="mx-1"
                    >
                      <CircleCheckBig />
                    </Button>
                    {/* <Button
                      isIconOnly
                      variant="light"
                      color="secondary"
                      className="mx-1"
                    >
                      <CircleSlash2 />
                    </Button> */}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
