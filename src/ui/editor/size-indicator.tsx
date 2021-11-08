import * as React from "react";

import { useEditor } from "@/store/editor";

export default function SizeIndicator() {
  const editor = useEditor();

  return (
    <span className="px-4 py-2 tabular-nums" id="pattern-size">
      {editor.size}
    </span>
  );
}
