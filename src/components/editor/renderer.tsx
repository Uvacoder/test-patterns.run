import * as React from "react";

import { useEditorStore } from "~/src/store/editor";
import { LogicFunction } from "@/types";
import createPattern from "@/utils/create-pattern";

interface RendererProps {
  children: LogicFunction;
}

export function transformer(s: string) {
  const sourceTrimmed = s.replace(/export default /, "");
  return `<Renderer>{${sourceTrimmed}}</Renderer>`;
}

const Renderer: React.FC<RendererProps> = (props) => {
  const { children } = props;

  const size = useEditorStore((store) => store.size);
  const pattern = React.useMemo(
    () => createPattern(children).test(size),
    [children, size],
  );

  return <pre>{pattern}</pre>;
};

export default Renderer;
