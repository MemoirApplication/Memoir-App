"use client";

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { RecentCard } from "./RecentCard";
import { cn } from "@nextui-org/theme";
import { FileIcon } from "lucide-react";
import { useLocalization } from "../contexts/LocalizationContext";

interface DocumentListProps {
  data?: Doc<"documents">[];
}
export const RecentDocumentList = ({}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const { dict } = useLocalization();

  // Query to fetch recent documents
  const documents = useQuery(api.documents.getRecentDocuments, {
    limit: 6, // Limit to 6 recent documents
  });

  // If documents are undefined, show skeleton loaders
  if (documents === undefined) {
    return (
      <div className="flex overflow-x-auto gap-x-4">
        <RecentCard.Skeleton />
        <RecentCard.Skeleton />
        <RecentCard.Skeleton />
      </div>
    );
  }

  // Redirect to the document
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      {/* Render each document item */}
      {documents.map((document) => (
        <div key={document._id}>
          <RecentCard
            id={document._id}
            onClick={() => {
              onRedirect(document._id); // Navigate to the document on click
            }}
            title={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            lastEdit={document.lastEditedTime as string}
            docContent={document.content as string}
          />
        </div>
      ))}
    </>
  );
};
