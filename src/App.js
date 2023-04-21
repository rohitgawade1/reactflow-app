import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import ButtonEdge from './components/ButtonEdge.jsx';

import "reactflow/dist/style.css";
import { TextUpdaterNode } from "./components/TextUpdaterNode";
import "./components/text-updater-node.css";
import Navbar from "./components/Navbar.jsx";

const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { label: "1" },
  },
];
const initialEdges = [{ id: "e1-2", type: 'buttonedge',  source: "1", target: "2" }];
const nodeTypes = { textUpdater: TextUpdaterNode };

const edgeTypes = {
  buttonedge: ButtonEdge,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  let [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [count, setCount] = useState(2);
  const [count2, setCount2] = useState(100);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleCreateNodeBtn = () => {
    setCount(count + 1);
    let n = count;
    setNodes([
      ...nodes,
      {
        id: n.toString(),
        type: "textUpdater",
        position: { x: count2, y: count2 },
        data: { label: n.toString() },
      },
    ]);
    setCount2(count2 + 100);
    setEdges([...edges, { id: "e1-2", type: 'buttonedge', source: n.toString(), target: (n+1).toString() }]);
  };

   onEdgesChange = (e) => {
    console.log(e.splice(0,1))
  } 

  

  return (
    <>
      <Navbar/>
      <div style={{ width: "100vw", height: "100vh" }}>
        <button onClick={handleCreateNodeBtn} className="create-node-button">
          Create Node
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
