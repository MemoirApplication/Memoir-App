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

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
      <div className=" h-screen bg-background text-foreground w-screen">
        <div className="relative z-50 mb-10">
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <div
          className={`fixed top-0 right-0 z-40 transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
        >
          <Navbar isBordered={true} height="h-16">
            <NavbarContent as="div" justify="start">
              <Button
                onClick={toggleSidebar}
                variant="light"
                color="secondary"
                isIconOnly
                size="sm"
              >
                <Menu />
              </Button>
              <Title initialData={document} />
            </NavbarContent>
            <NavbarContent justify="end">
              <p>end of nav bar</p>
            </NavbarContent>
          </Navbar>
          {document.isArchived && <Banner documentId={document._id} />}
        </div>

        <div
          className={`fixed right-0 h-screen flex-grow bg-background text-foreground transition-all duration-300 ${isCollapsed ? "w-full" : "w-[calc(100%-18rem)]"}`}
        >
          <div className="m-10">
            <div className="h-[35vh]" />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
              <Toolbar initialData={document} />
              <div className="mt-2">
                <Editor onChange={onChange} initialData={document} />
              </div>
            </div>
            {/* Main Contenet */}
          </div>
        </div>
      </div>
    </>
  );
}
