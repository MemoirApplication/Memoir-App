"use client";

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Item } from "./item";
import { cn } from "@nextui-org/theme";
import { FileIcon } from "lucide-react";

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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

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

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : "12px",
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 p-2 ",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages Inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => {
              onRedirect(document._id);
            }}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => {
              onExpand(document._id);
            }}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
