"use client";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
interface BannerProps {
  documentId: Id<"documents">;
}
export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "Note removed!",
      error: "Failed removing.",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Note restored!",
      error: "Failed restoring.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash</p>
      <Button size="sm" onClick={onRestore} variant="faded" color="secondary">
        Restore Page
      </Button>
      <Button size="sm" onClick={onRemove} variant="faded" color="danger">
        Delete
      </Button>
    </div>
  );
};
