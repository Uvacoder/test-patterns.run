import * as React from "react";

import { useEditor } from "@/store/editor";
import { LogicFunction } from "@/types";
import createPattern from "@/utils/create-pattern";

interface RendererProps {
  children: LogicFunction;
}

export function transformer(s: string) {
  const sourceTrimmed = s.replace(/export default /, "");
  return `<Renderer>{${sourceTrimmed}}</Renderer>`;
}

export default function Renderer({ children }: RendererProps) {
  const editor = useEditor();
  const pattern = React.useMemo(() => createPattern(children).test(editor.size), [children, editor.size]);

  return <pre>{pattern}</pre>;
}
