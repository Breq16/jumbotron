import React from "react";
import { NodeEditor } from "flume";
import config from "./config";

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <NodeEditor
        portTypes={config.portTypes}
        nodeTypes={config.nodeTypes}
        defaultNodes={[
          {
            type: "ending",
            x: 100,
            y: 100,
          },
        ]}
      />
    </div>
  );
}

export default App;
