import React, { useRef, useCallback } from 'react';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import { useQuery } from '../../convex/_generated/react';
import { getDocuments } from '../../convex/documents';

interface NodeObject {
  id: string;
  title?: string;
}

interface LinkObject {
  source: string;
  target: string;
}

const ForceGraph: React.FC = () => {
  const fgRef = useRef<ForceGraphMethods>();
  const documents = useQuery(getDocuments) || [];

  const graphData = {
    nodes: documents.map((doc:any) => ({id:doc._id, title:doc.title})),
    links: documents.flatmap((doc:any) => (doc.links || []).map((linkId: string)=> ({source: doc._id, target: linkId})))
  };

  const handleNodeClick = useCallback((node: NodeObject) => {
    console.log('Clicked node:', node);
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    fgRef.current?.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node as any,
      3000
    );
  } [fgRef]);

  return(
    <ForceGraph3D
      ref={fgRef}
      graphData={graphData}
      nodeLabel={(node: NodeObject) => node.title || node.id}
      nodeColor={()=>'#00ffff'}
      linkColor={()=>'#ffffff'}
      backgroundColor="#000011"
      onNodeClick={handleNodeClick}
      width={800}
      height={600}
    />
  );
};

export default ForceGraph;
