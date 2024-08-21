"use client";

import { api } from "../../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";

import { Banner } from "@/app/(main)/_components/banner";
import { Spinner } from "@nextui-org/spinner";
import { Toolbar } from "@/app/(main)/_components/toolbar";
import { CNavbar } from "@/app/(main)/_components/CNavbar";
import dynamic from "next/dynamic";
import { Cover } from "@/components/cover";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  // Query to fetch the document by its ID
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  // Mutation function to update the document
  const update = useMutation(api.documents.update);

  // Handler function for updating the document content
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  // Show a spinner while documents are loading
  if (document === undefined) {
    return (
      // <Cover.Skeleton />
      <div className="bg-background text-foreground h-screen w-screen flex flex-col items-center justify-center">
        <Spinner color="secondary" className="py-4 mt-10" />
      </div>
    );
  }

  // If the document is null, display a "Not Found" message
  if (document === null) {
    return <div> Not Found </div>;
  }

  return (
    <>
      <div className="w-screen flex-grow flex">
        {/* Container for resizing navbar and banner based on sidebar state */}
        {/* Main content area that adjusts width based on sidebar state */}
        <div
          className={`top-0 right-0 h-screen transition-all duration-300 w-full`}
        >
          {/* Cover should remain unaffected by isFullWidth */}
          <Cover preview url={document.coverImage} />

          <div className="flex justify-center">
            <div
              className={`transition-all duration-300 ${document.isFullWidth ? "max-w-full" : "md:max-w-3xl lg:max-w-4xl"} w-full`}
            >
              <div className="mt-2">
                <Toolbar preview initialData={document} />
                <Editor
                  editable={false}
                  onChange={onChange}
                  initialData={document}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
