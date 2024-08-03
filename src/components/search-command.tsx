"use client";

import { useEffect, useState } from "react";
import { File, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

import { useSearch } from "@/hooks/search-hook";
import { api } from "../../convex/_generated/api";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";

export const SearchCommand = () => {
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={onClose}
      onClose={onClose}
      backdrop="blur"
      shouldCloseOnBlur={true}
      shouldCloseOnInteractOutside={(e) => {
        // Return true if onClose should be called
        return true;
      }}
    >
      <PopoverTrigger>
        <div></div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="text-sm">
          <div className="flex items-center gap-x-1 p-2">
            <Search className="mr-3" />
            <Input
              variant="faded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${user?.fullName}'s workspace...`}
            />
          </div>
          <div className="mt-2 px-1 pb-1">
            <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
              No documents found.
            </p>
            {filterDocuments?.map((document) => (
              <div
                key={document._id}
                role="button"
                onClick={() => onClick(document._id)}
                className="text-sm rounded-md w-full hover:bg-secondary/5 flex items-start text-secondary "
              >
                {document.icon ? (
                  <p className="mr-2 text-[18px]">{document.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}
                <span className="truncate pl-2">{document.title}</span>
                <div className="flex  items-center"></div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
