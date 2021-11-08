import * as React from "react";

import { useEditor } from "@/store/editor";

export default function Increment() {
  const editor = useEditor();

  return (
    <button className="px-2 text-gray-900 bg-gray-400 rounded-sm" onClick={editor.increment} type="button">
      +
    </button>
  );
}
