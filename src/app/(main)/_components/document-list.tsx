"use client";

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Item } from "./item";
import { cn } from "@nextui-org/theme";
import { FileIcon } from "lucide-react";
import { useLocalization } from "../contexts/LocalizationContext";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}
export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({}); // Track the expanded state of each item
  const { dict } = useLocalization();


  // Toggle the expanded state of the item
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  // Query to fetch documents based on the parent document ID
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  // If documents are undefined, show skeleton loaders
  if (documents === undefined) {
    return (
      <>
      <div className="p-[6px]">
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
        </div>
      </>
    );
  }

  // Redirect to the document
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      {/* Displays a message if there are no pages inside, based on the expanded state */}
      <p
        style={{
          paddingInlineStart: level ? `${level * 12 + 25}px` : "12px",
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 p-2 select-none",
          expanded && "last:block",
          level === 0 && "hidden",
          "text-start"
        )}
      >
        {dict.main.components.documentList.noPage}
      </p>
      {/* Render each document item */}
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => {
              onRedirect(document._id); // Navigate to the document on click
            }}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => {
              onExpand(document._id); // Toggle expansion on click
            }}
            
            expanded={expanded[document._id]}
          />
          {/* Recursively render nested documents if the item is expanded */}
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
