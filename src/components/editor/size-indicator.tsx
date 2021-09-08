import * as React from "react";

import { useEditorStore } from "~store/editor";

export default function SizeIndicator() {
  const size = useEditorStore(React.useCallback((store) => store.size, []));

  return (
    <span className="px-4 py-2 tabular-nums" id="pattern-size">
      {size}
    </span>
  );
}
