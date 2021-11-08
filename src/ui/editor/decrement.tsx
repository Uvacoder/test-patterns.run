import * as React from "react";

import { useEditor } from "@/store/editor";

export default function Decrement() {
  const editor = useEditor();
  const shouldDisable = React.useMemo(() => editor.size < 2, [editor.size]);

  return (
    <button
      className="px-2 text-gray-900 bg-gray-400 rounded-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
      disabled={shouldDisable}
      onClick={editor.decrement}
      type="button"
    >
      -
    </button>
  );
}
