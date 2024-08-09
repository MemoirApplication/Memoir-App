"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  PartialBlock,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { Doc } from "../../convex/_generated/dataModel";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
// import { useCreateBlockNote } from "@blocknote/react";
import { Alert } from "./CustomBlocks/alert";
import { RiAlertFill } from "react-icons/ri";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";

interface EditorProps {
  onChange: (value: string) => void;
  initialData: Doc<"documents">;
  editable?: boolean;
}

// new blocknote schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
const schema = BlockNoteSchema.create({
  blockSpecs: {
    // all default blocks
    ...defaultBlockSpecs,
    // the new alert block
    alert: Alert,
  },
});

// the slash menu items
const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Alert",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "alert",
    });
  },
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Other",
  icon: <RiAlertFill />,
});

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
      schema,
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
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            // get all default slash menu items and 'insertAlert' item
            filterSuggestionItems(
              [...getDefaultReactSlashMenuItems(editor), insertAlert(editor)],
              query
            )
          }
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;
