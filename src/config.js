import { FlumeConfig, Colors, Controls } from "flume";

const config = new FlumeConfig();

config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.green,
    controls: [
      Controls.text({
        name: "string",
        label: "Text",
      }),
    ],
  })
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: (ports) => [ports.string()],
    outputs: (ports) => [ports.string()],
  })
  .addRootNodeType({
    type: "ending",
    label: "End",
    inputs: (ports) => [
      ports.string({
        name: "title",
        label: "Title",
      }),
      ports.string({
        name: "text",
        label: "Text",
      }),
    ],
  });

export default config;
