import * as React from "react";

import { useEditorStore } from "~store/editor";

export default function Increment() {
  const inc = useEditorStore(React.useCallback((store) => store.increment, []));

  return (
    <button className="px-2 text-gray-900 bg-gray-400 rounded-sm" onClick={inc} type="button">
      +
    </button>
  );
}
