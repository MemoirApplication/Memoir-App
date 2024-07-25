const DocumentsPage = () => {
  return <div>This is the Documents Page</div>;
};
export default DocumentsPage;

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
