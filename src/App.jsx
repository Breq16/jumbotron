import React from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import engine from "./engine";
import Preview from "./Preview";

function useFrameCount() {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => frame + 1);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return frame;
}

function App() {
  const [nodes, setNodes] = React.useState({});

  const frame = useFrameCount();
  const filesystem = React.useRef(null);
  const [stills, setStills] = React.useState([]);
  const [videos, setVideos] = React.useState([]);

  React.useEffect(async () => {
    if (!filesystem.current) {
      return;
    }

    const stillsHandle = await filesystem.current.getDirectoryHandle("stills");
    const videosHandle = await filesystem.current.getDirectoryHandle("videos");

    let stills = [];
    let videos = [];

    for await (const entry of stillsHandle.values()) {
      if (entry.kind === "file" && entry.name.endsWith(".png")) {
        stills.push(entry.name);
      }
    }

    for await (const entry of videosHandle.values()) {
      console.log(entry);
    }

    setStills(stills);
    setVideos(videos);
  }, [filesystem.current]);

  const { image } = useRootEngine(nodes, engine, {
    frameCount: frame,
    filesystem: filesystem.current,
  });

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
        context={{
          stills,
          videos,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          maxWidth: "25%",
          opacity: 0.5,
        }}
      >
        <Preview image={image} filesystem={filesystem.current} />
      </div>
      <button
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={async () => {
          filesystem.current = await window.showDirectoryPicker();
        }}
      >
        load files
      </button>
    </div>
  );
}

export default App;
