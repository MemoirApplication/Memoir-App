// "use client";

import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Define types for our graph data
type GraphNode = {
  id: string;
  name: string;
  val: number;
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

const DocumentGraph = () => {
  const documents = useQuery(api.documents.getDocuments);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    if (documents) {
      const nodes: GraphNode[] = documents.map((doc) => ({
        id: doc._id,
        name: doc.title,
        val: 1,
      }));

      const links: GraphLink[] = documents.reduce((acc: GraphLink[], doc) => {
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
    <ForceGraph3D
      graphData={graphData}
      nodeLabel="name"
      nodeAutoColorBy="group"
      linkDirectionalParticles={2}
    />
  );
};

export default DocumentGraph;
