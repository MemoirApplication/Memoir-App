"use client";

import { useEffect, useMemo, useState } from "react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { Doc } from "../../convex/_generated/dataModel";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
// import { useCreateBlockNote } from "@blocknote/react";

interface EditorProps {
  onChange: (value: string) => void;
  initialData: Doc<"documents">;
  editable?: boolean;
}

const Editor = ({ onChange, initialData, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const update = useMutation(api.documents.update);

  async function saveToStorage(jsonBlocks: Block[]) {
    // Save contents to local storage. You might want to debounce this or replace
    // with a call to your API / database.

    update({
      id: initialData._id,
      content: JSON.stringify(jsonBlocks),
    });
  }

  async function loadFromStorage() {
    // Gets the previously stored editor contents.
    return initialData.content
      ? (JSON.parse(initialData.content) as PartialBlock[])
      : undefined;
    // const storageString = initialData.content;
    // return storageString
    //   ? (JSON.parse(storageString) as PartialBlock[])
    //   : undefined;
  }

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent,
    });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <div>
      <BlockNoteView 
        data-theming-background
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
        saveToStorage(editor.document);
        }}
      />
    </div>
  );
};

export default Editor;
