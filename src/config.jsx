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
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.blue,
    controls: [
      Controls.number({
        name: "number",
        label: "Number",
      }),
    ],
  })
  .addPortType({
    type: "image",
    name: "image",
    label: "Image",
    color: Colors.red,
    controls: [
      Controls.select({
        name: "image",
        label: "Image",
        getOptions: (inputData, executionContext) =>
          executionContext.stills.map((name) => ({
            value: name,
            label: name,
          })),
      }),
    ],
  })
  .addNodeType({
    type: "numberToString",
    label: "Print Number",
    description: "Convert a number to a string",
    inputs: (ports) => [ports.number()],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "image",
    label: "Image",
    description: "Outputs an image",
    inputs: (ports) => [ports.image()],
    outputs: (ports) => [ports.image()],
  })
  .addNodeType({
    type: "frameCount",
    label: "Frame Count",
    description: "Outputs the current frame count",
    outputs: (ports) => [ports.number({ label: "Current Frame Index" })],
  })
  .addNodeType({
    type: "divide",
    label: "Divide",
    description: "Divide two numbers",
    inputs: (ports) => [
      ports.number({
        name: "number",
        label: "Dividend",
      }),
      ports.number({
        name: "number2",
        label: "Divisor",
      }),
    ],
    outputs: (ports) => [ports.number({ label: "Quotient" })],
  })
  .addNodeType({
    type: "multiplexer",
    label: "Multiplexer",
    description: "Multiplexes multiple image inputs",
    inputs: (ports) => (inputData, connections, context) => {
      const count = inputData.count?.number;
      const imageInputs = [...Array(count)].map((_, i) =>
        ports.image({
          name: `image${i}`,
          label: `Image ${i}`,
        })
      );
      return [
        ports.number({ name: "count", label: "Total" }),
        ports.number({ name: "index", label: "Index" }),
        ...imageInputs,
      ];
    },
    outputs: (ports) => [ports.image({ label: "Selected" })],
  })
  .addRootNodeType({
    type: "ending",
    label: "Display",
    inputs: (ports) => [
      ports.image({
        name: "image",
        label: "Output",
      }),
    ],
  });

export default config;
