"use client";

import { useState, useEffect } from "react";
import { getDocuments, createDocument } from "../../../../utils/db";
import { Sidebar } from "../../_components/Sidebar";
import { Card, CardBody } from "@nextui-org/card";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  };

  const handleCreateDocument = async () => {
    try {
      const newDoc = { title: "New Document", content: "Start writing..." };
      await createDocument(newDoc);
      loadDocuments();
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

  const handleSelectDocument = (id) => {
    setSelectedDocument(id);
    // Here you would typically load the content of the selected document
  };

  return (
    // <div className="flex">
    <div className=" select-none h-full flex flex-col items-center justify-center space-y-4">
      <Card>
        <CardBody>
          <p>Start a Note</p>
        </CardBody>
      </Card>
    </div>
    /* <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Documents</h1>
        {selectedDocument ? (
          <p>Selected document: {selectedDocument}</p>
        ) : (
          <p>Select a document from the sidebar</p>
        )}
      </main> */
    // </div>
  );
}
