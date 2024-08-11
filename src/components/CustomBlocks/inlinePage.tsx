"use client";

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import "./styles.css";
import "@blocknote/core/fonts/inter.css";
import { LucideIcon, NotepadText } from "lucide-react";
import { Button } from "@nextui-org/button";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const OnCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  event.stopPropagation();
  const create = useMutation(api.documents.create);

  const promise = create({ title: "Untitled", parentDocument: id }).then(
    (documentId) => {}
  );
  toast.promise(promise, {
    loading: "Creating a new note...",
    success: "New note created!",
    error: "Failed to create a new note.",
  });
};

// The inlinePage block.
export const inlinePage = createReactBlockSpec(
  {
    type: "inlinePage",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: { default: "Page" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const Icon = NotepadText;
      return (
        <div className={"inline-content"}>
          <Button variant="ghost" radius="sm" onClick={() => {}}>
            <NotepadText size={20} />
            New Page
          </Button>
        </div>
      );
    },
  }
);
