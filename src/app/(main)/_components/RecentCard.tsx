"use client";

import { LucideIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@nextui-org/theme";
import { Skeleton } from "@nextui-org/skeleton";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useUser } from "@clerk/clerk-react";
import { useLocalization } from "../contexts/LocalizationContext";
import { format, formatDistanceToNow } from "date-fns";

interface CardProps {
  id?: Id<"documents">;
  title: string;
  documentIcon?: string;
  onClick?: () => void;
  icon: LucideIcon;
  lastEdit: string;
  docContent: string;
}

const extractPreviewText = (content: string, maxWords: number = 50): string => {
  if (!content) {
    return ""; // Return an empty string if content is not available
  }

  try {
    const blocks = JSON.parse(content);

    // Extract text from the content blocks
    let text = "";
    blocks.forEach((block: any) => {
      if (block.type === "paragraph" && block.content) {
        block.content.forEach((item: any) => {
          if (item.type === "text" && item.text) {
            text += item.text + " ";
          }
        });
      }
    });

    // Split the text into words and limit the number of words
    const words = text.trim().split(/\s+/);
    const previewText = words.slice(0, maxWords).join(" ");

    return previewText;
  } catch (error) {
    console.error("Error parsing content:", error);
    return "Unable to display preview";
  }
};

// Item component for displaying a document
export const RecentCard = ({
  id,
  title,
  documentIcon,
  onClick,
  icon: Icon,
  lastEdit,
  docContent,
}: CardProps) => {
  const { user } = useUser();
  const router = useRouter();
  const { dict } = useLocalization();

  const lastEditedDate = new Date(parseInt(lastEdit as string));
  const formattedDate = format(lastEditedDate, "MMM dd, yyyy HH:mm");
  const timeAgo = formatDistanceToNow(lastEditedDate, { addSuffix: true });

  const previewText = extractPreviewText(docContent);

  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  return (
    <div>
      <Card
        isPressable
        onPress={onClick}
        className="p-4 w-60 min-w-60 shrink-0 h-96 bg-opacity-80 backdrop-blur-lg text-start"
      >
        <div dir="auto" className="flex flex-row items-center justify-between pb-1 overflow-hidden w-52">
          {documentIcon ? (
            <div className="shrink-0 h-[18px] me-2 text-foreground-700">
              {documentIcon}
            </div>
          ) : (
            <Icon className="shrink-0 h-[18px] me-1 text-foreground-700" />
          )}
          <p className="text-xl font-semibold select-none text-foreground-700 w-full truncate">
            {title}
          </p>
        </div>
        <p className="text-sm font-light select-none text-foreground-400 pb-2">
          {dict.components.toolbar.lastEdit} {formattedDate}, {timeAgo}
        </p>
        <Divider />
        <p
          dir="auto"
          className="text-m font-normal select-none text-foreground-600 py-2 overflow-wrap break-words"
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 10, // Adjust number of lines
            overflow: "hidden",
            paddingBottom: "0.2em",
          }}
        >
          {previewText}
        </p>
      </Card>
    </div>
  );
};

// Skeleton component for loading state
RecentCard.Skeleton = function RecentCardSkeleton() {
  return (
    <Skeleton className="rounded-lg w-60 min-w-60 shrink-0 h-96 opacity-70" />
  );
};
