import { FlumeConfig, Colors, Controls } from "flume";
import ImageInput from "./ImageInput";

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
  .addPortType({
    type: "image",
    name: "image",
    label: "Image",
    color: Colors.blue,
    controls: [
      Controls.custom({
        name: "image",
        label: "Image",
        render: (data, onChange) => (
          <ImageInput data={data} onChange={onChange} />
        ),
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
  .addNodeType({
    type: "image",
    label: "Image",
    description: "Outputs an image",
    inputs: (ports) => [ports.image()],
    outputs: (ports) => [ports.image()],
  })
  .addRootNodeType({
    type: "ending",
    label: "End",
    inputs: (ports) => [
      ports.string({
        name: "title",
        label: "Title",
      }),
      ports.image({
        name: "image",
        label: "Image",
      }),
    ],
  });

export default config;
