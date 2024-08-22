"use client";

import { api } from "../../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useMemo, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";

import { Banner } from "@/app/(main)/_components/banner";
import { Spinner } from "@nextui-org/spinner";
import { Toolbar } from "@/app/(main)/_components/toolbar";
import { CNavbar } from "@/app/(main)/_components/CNavbar";
import { useSidebar } from "../../../contexts/SidebarContext";
import dynamic from "next/dynamic";
import { Cover } from "@/app/(main)/_components/cover";

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

  // Use sidebar context to determine if the sidebar is collapsed
  const { isCollapsed } = useSidebar();

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
      {/* background color */}
      {/* <div className="bg-background min-h-screen w-screen top-0 left-0 right-0 z-0 absolute"></div> */}

      <div className="w-screen flex-grow flex">
        {/* Container for resizing navbar and banner based on sidebar state */}
        <div
          className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-0" : "ml-[18rem]"}`}
        >
          {/* Fixed container for Navbar and Banner, adjusting width based on sidebar state */}
          <div
            className={`fixed top-0 right-0 z-40 transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
          >
            <CNavbar document={document} />
            {document.isArchived && <Banner documentId={document._id} />}
          </div>
        </div>

        {/* Main content area that adjusts width based on sidebar state */}
        <div
          className={`top-0 right-0 h-screen transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
        >
          {/* Cover should remain unaffected by isFullWidth */}
          <Cover url={document.coverImage} />

          <div className="flex justify-center">
            <div
              className={`transition-all duration-300 ${document.isFullWidth ? "max-w-full" : "md:max-w-3xl lg:max-w-4xl"} w-full`}
            >
              <div className="mt-2">
                <Toolbar initialData={document} />
                <Editor onChange={onChange} initialData={document} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
