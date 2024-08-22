import dynamic from "next/dynamic";
import React from "react";

const DocumentGraphClient = dynamic(() => import("./documentGraphClient"), {
  ssr: false,
  loading: () => <p>Loading graph...</p>,
});

const DocumentGraph = () => {
  return <DocumentGraphClient />;
};

export default DocumentGraph;
