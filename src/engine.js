import { RootEngine } from "flume";
import config from "./config";

const resolvePorts = (portType, data) => {
  switch (portType) {
    case "string":
      return data.string;
    case "number":
      return data.number;
    case "image":
      return data.image;
    default:
      return data;
  }
};

const resolveNodes = (node, inputValues, nodeType, context) => {
  switch (node.type) {
    case "numberToString":
      return { string: String(inputValues.number) };
    case "image":
      return { image: inputValues.image };
    case "divide":
      return { number: inputValues.number / inputValues.number2 };
    case "frameCount":
      return { number: context.frameCount };
    case "ending":
      return { title: inputValues.title, image: inputValues.image };
    case "multiplexer":
      return {
        image:
          inputValues[`image${(inputValues.index | 0) % inputValues.count}`],
      };
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const engine = new RootEngine(config, resolvePorts, resolveNodes);

export default engine;
