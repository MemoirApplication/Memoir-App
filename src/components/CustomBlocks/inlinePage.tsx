"use client";

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import "./styles.css";
import "@blocknote/core/fonts/inter.css";
import { NotepadText } from "lucide-react";
import { Button } from "@nextui-org/button";
import React from "react";

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
