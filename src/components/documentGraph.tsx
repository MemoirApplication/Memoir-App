import dynamic from "next/dynamic";
import React from "react";

const DocumentGraphClient = dynamic(() => import("./documentGraphClient"), {
  ssr: false,
  loading: () => null,
});

const DocumentGraph = () => {
  return <DocumentGraphClient />;
};

export default DocumentGraph;
