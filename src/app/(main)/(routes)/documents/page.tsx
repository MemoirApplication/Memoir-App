"use client";

import { useState, useEffect } from "react";
import { getDocuments, createDocument } from "../../../../utils/db";
import { Sidebar } from "../../_components/Sidebar";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const docs = await getDocuments();
    setDocuments(docs);
  };

  const handleCreateDocument = async () => {
    const newDoc = { title: "New Document", content: "Start writing..." };
    await createDocument(newDoc);
    loadDocuments();
  };

  const handleSelectDocument = (id) => {
    setSelectedDocument(id);
    // Here you would typically load the content of the selected document
  };

  return (
    <div className="flex">
      <Sidebar
        documents={documents}
        onSelectDocument={handleSelectDocument}
        onCreateDocument={handleCreateDocument}
      />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Documents</h1>
        {selectedDocument ? (
          <p>Selected document: {selectedDocument}</p>
        ) : (
          <p>Select a document from the sidebar</p>
        )}
      </main>
    </div>
  );
}
// import { useState, useEffect } from "react";
// import { getDocuments, createDocument } from "@/utils/db";

// export default function Documents() {
//   const [documets, setDocuments] = useState([]);

//   useEffect(() => {
//     loadDocuments();
//   }, []);

//   const loadDocuments = async () => {
//     const docs = await getDocuments();
//     setDocuments(docs);
//   };
//   const handleCreateDocument = async () => {
//     const newDoc = { title: "New Document", content: "Start writing..." };
//     await createDocument(newDoc);
//     loadDocuments();
//   };

//   return (
//     <div>
//       <h1>Documents</h1>
//       <button onClick={handleCreateDocument}>Create Document</button>
//       {documets.map((doc) => (
//         <div key={doc._id}>{doc.title}</div>
//       ))}
//     </div>
//   );
// }
