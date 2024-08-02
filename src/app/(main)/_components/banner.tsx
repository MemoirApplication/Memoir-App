"use client";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
interface BannerProps {
  documentId: Id<"documents">; // ID of the document being handled
}
export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  // Mutation hooks for removing and restoring documents
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  // Handler for deleting the document
  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "Note removed!",
      error: "Failed removing.",
    });
    // Redirect to documents page after successful removal
    router.push("/documents");
  };

  // Handler for restoring the document
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Note restored!",
      error: "Failed restoring.",
    });
  };

  return (
    <div className="w-full bg-danger-400 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash</p>
      {/* Button to restore the page, calls onRestore when pressed */}
      <Button size="sm" onClick={onRestore} variant="faded" color="secondary"> 
        Restore Page
      </Button>

      {/* Button to delete the page, calls onRemove when pressed */}
      <Button size="sm" onClick={onRemove} variant="faded" color="danger">
        Delete
      </Button>
    </div>
  );
};
