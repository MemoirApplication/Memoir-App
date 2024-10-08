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

// Component for rendering a list of favorite documents
export const FavDocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { dict } = useLocalization();

  // Toggle the expanded state of a document
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  // Fetch favorite documents from the API
  const documents = useQuery(api.documents.getFavSidebar, {
    parentDocument: parentDocumentId,
  });

  // Display skeleton loaders while documents are being fetched
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
      <p
        style={{
          paddingInlineStart: level ? `${level * 12 + 25}px` : "12px",
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 p-2 justify-start select-none",
          expanded && "last:block",
          level === 0 && "hidden",
          "text-start" // Ensure text aligns with the flow (left in LTR, right in RTL)
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
            active={params.documentId === document._id} // Highlight active document
            level={level}
            onExpand={() => {
              onExpand(document._id); // Toggle expansion on click
            }}
            expanded={expanded[document._id]}
          />
          {/* Render child documents if expanded */}
          {expanded[document._id] && (
            <FavDocumentList
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};
