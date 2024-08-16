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
import { defaultProps } from "@blocknote/core";
import "./CustomBlocks/styles.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { Doc } from "../../convex/_generated/dataModel";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Alert } from "./CustomBlocks/alert";
import { RiAlertFill } from "react-icons/ri";
import {
  createReactBlockSpec,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import { NotepadText } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useEdgeStore } from "@/lib/edgestore";

import { Wand } from "lucide-react";
import { useCompletion } from "ai/react";

interface EditorProps {
  onChange: (value: string) => void;
  initialData: Doc<"documents">;
  editable?: boolean;
}

const Editor = ({ onChange, initialData, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const update = useMutation(api.documents.update);
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  // new blocknote schema with block specs, which contain the configs and implementations for blocks
  // that we want our editor to use.

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

  const [blocks, setBlocks] = useState<Block[]>([]);

  const { complete } = useCompletion({
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        // throw new Error("API rate limit exceeded  (error code 429)");
        return;
      }
      if (response.body) {
        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        reader.read().then(function processText({ done, value }) {
          if (done) {
            return;
          }
          let chunk = decoder.decode(value, { stream: true });
          editor?._tiptapEditor.commands.insertContent(chunk);
          reader.read().then(processText);
        });
      } else {
        console.error("Response body is null");
      }
    },
    onError: (e) => console.error(e.message),
  });

  const insertMagicAi = (editor: typeof schema.BlockNoteEditor) => {
    // const prevText = editor._tiptapEditor.state.doc.textBetween(
    //   Math.max(0, editor._tiptapEditor.state.selection.from - 5000),
    //   editor._tiptapEditor.state.selection.from - 1,
    //   "\n"
    // );
    // complete(prevText);
    complete("Why is the sky blue?");
  };

  const insertMagicItem = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Insert Magic Text",
    onItemClick: async () => {
      const prevText = editor._tiptapEditor.state.doc.textBetween(
        Math.max(0, editor._tiptapEditor.state.selection.from - 5000),
        editor._tiptapEditor.state.selection.from - 1,
        "\n"
      );
      insertMagicAi(editor);
    },
    aliases: ["autocomplete", "ai"],
    group: "Ai",
    icon: <Wand size={18} />,
    subtext: "Continue your note with Ai-Generated text",
  });

  const insertPage = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Inline Page",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "inlinePage",
      });
      const promise = create({
        title: "Untitled",
        parentDocument: initialData._id,
        blockId: blocks[0].id,
      });
      toast.promise(promise, {
        loading: "Creating a new note...",
        success: "New note created!",
        error: "Failed to create a new note.",
      });
    },

    aliases: ["page", "newpage", "inlinePage", "inlinepage"],
    group: "Other",
    icon: <NotepadText size={18} />,
  });

  const InlinePageContent = ({ blockId }: { blockId: string }) => {
    const document = useQuery(api.documents.getByBlockId, {
      bid: blockId,
    }) as Doc<"documents">;
    const [isLoading, setIsLoading] = useState(true);
    const updateDocument = useMutation(api.documents.update);

    useEffect(() => {
      if (document === undefined) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }, [document]);

    useEffect(() => {
      if (document && document.title === "Untitled") {
        // Update the title if it's still "Untitled"
        updateDocument({ id: document._id, title: "Untitled" });
      }
    }, [document, updateDocument]);

    if (isLoading) {
      return (
        <div
          role="button"
          className="select-none bg-secondary/10 hover:bg-secondary/25 rounded-md flex p-3 w-fit font text-medium transition-all text-muted-foreground inline-content"
        >
          Loading...
        </div>
      );
    }

    if (!document) {
      return (
        <div
          role="button"
          className="select-none bg-secondary/10 hover:bg-secondary/25 rounded-md flex p-3 w-fit font text-medium transition-all text-muted-foreground inline-content"
        >
          Document not found
        </div>
      );
    }

    return (
      <div>
        <div
          onClick={() => {
            router.push(`/documents/${document._id}`);
          }} // redirect to the page
          role="button"
          className="select-none bg-secondary/10 hover:bg-secondary/25 rounded-md flex py-3 px-20 w-fit font text-medium transition-all text-muted-foreground inline-content"
        >
          <span className="text-medium">
            {document.icon} &#8203;{document.title}
          </span>
        </div>
      </div>
    );
  };

  const inlinePage = createReactBlockSpec(
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
        // const Icon = NotepadText;
        return <InlinePageContent blockId={props.block.id} />;
      },
    }
  );

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      // all default blocks
      ...defaultBlockSpecs,
      // the new alert block
      alert: Alert,
      inlinePage: inlinePage,
    },
  });

  async function saveToStorage(jsonBlocks: Block[]) {
    // Save contents to local storage. You might want to debounce this or replace
    // with a call to  API

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const handleupload = async (file: File) => {
    const respond = await edgestore.publicFiles.upload({
      file,
    });
    return respond.url;
  };

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent,
      schema,
      uploadFile: handleupload,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          saveToStorage(editor.document as Block[]);
        }}
        slashMenu={false}
        onSelectionChange={() => {
          const selection = editor.getSelection();

          // Get the blocks in the current selection and store on the state. If
          // the selection is empty, store the block containing the text cursor
          // instead.
          if (selection !== undefined) {
            setBlocks(selection.blocks as Block[]);
          } else {
            setBlocks([editor.getTextCursorPosition().block as Block]);
          }
        }}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            // get all default slash menu items and 'insertAlert' item
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                insertAlert(editor),
                insertPage(editor),
                insertMagicItem(editor),
              ],
              query
            )
          }
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;
