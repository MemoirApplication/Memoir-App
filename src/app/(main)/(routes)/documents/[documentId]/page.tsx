"use client";

import { api } from "../../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";

import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Menu } from "lucide-react";

import { Sidebar } from "@/app/(main)/_components/Sidebar";
import { Title } from "@/app/(main)/_components/title";
import { Skeleton } from "@nextui-org/skeleton";
import { Banner } from "@/app/(main)/_components/banner";
import { Spinner } from "@nextui-org/spinner";
import { Toolbar } from "@/components/toolbar";
import { CNavbar } from "@/app/(main)/_components/CNavbar";
import { useSidebar } from "../../../contexts/SidebarContext";
import dynamic from "next/dynamic";

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

  const { isCollapsed } = useSidebar(); // Use the context here
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div className="bg-background text-foreground h-screen w-screen flex flex-col items-center justify-center">
        <Spinner color="secondary" className="py-4 mt-10" />
      </div>
    );
  }
  if (document === null) {
    return <div> Not Found </div>;
  }

  return (
    <>
      {/* background color */}
      <div className="bg-background h-screen w-screen top-0 left-0 right-0 z-0 absolute"></div>

      <div className="text-foreground w-screen flex-grow flex">
        <div className="z-50">
          <Sidebar />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-0" : "ml-[18rem]"}`}
        >
          {/* Navbar and banner */}
          <div
            className={`fixed top-0 right-0 z-40 transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
          >
            <CNavbar document={document} />
            {document.isArchived && <Banner documentId={document._id} />}
          </div>
        </div>

        {/* Main note body */}
        <div
          className={`top-0 right-0 h-screen transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
        >
          <div className="">
            <div className="h-[35vh]" />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
              <Toolbar initialData={document} />
              <div className="mt-2">
                <Editor onChange={onChange} initialData={document} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
