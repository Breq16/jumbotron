import React from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import engine from "./engine";

function App() {
  const [nodes, setNodes] = React.useState({});
  const { title, image } = useRootEngine(nodes, engine, {});

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <NodeEditor
        portTypes={config.portTypes}
        nodeTypes={config.nodeTypes}
        nodes={nodes}
        onChange={setNodes}
        defaultNodes={[
          {
            type: "ending",
            x: 100,
            y: 100,
          },
        ]}
      />
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <img src={image} style={{ maxWidth: "25%", opacity: 0.5 }} />
      </div>
    </div>
  );
}

export default App;
