"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@nextui-org/skeleton";
import { useLocalization } from "../contexts/LocalizationContext";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { dict } = useLocalization();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={`relative w-full ${!url ? "h-[12vh]" : "h-[35vh]"} group ${url ? "bg-default-50" : ""}`}
    >
      {/* TODO Check cn */}
      {!!url && (
        <Image src={url} fill alt="Cover Image" className="object-cover" />
      )}
      {url && !preview && (
        <div className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="solid"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            {dict.components.cover.change}
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="solid"
          >
            <X className="h-4 w-4 me-2" />
            {dict.components.cover.remove}
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
