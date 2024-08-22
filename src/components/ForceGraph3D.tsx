import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const DocumentGraph = () => {
  const documents = useQuery(api.documents.getDocuments);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (documents) {
      const nodes = documents.map((doc) => ({
        id: doc._id,
        name: doc.title,
        val: 1,
      }));

      const links = documents.reduce((acc, doc) => {
        if (doc.parentDocument) {
          acc.push({
            source: doc.parentDocument,
            target: doc._id,
          });
        }
        return acc;
      }, []);

      setGraphData({ nodes, links });
    }
  }, [documents]);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ForceGraph3D
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
      />
    </div>
  );
};

export default DocumentGraph;
