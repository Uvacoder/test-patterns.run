/* eslint-disable @typescript-eslint/unbound-method */

import * as React from "react";

import { useEditorStore } from "~/src/store/editor";

const SizeIndicator: React.FC = () => {
  const size = useEditorStore(React.useCallback((store) => store.size, []));

  return (
    <span className="px-4 py-2 tabular-nums" id="pattern-size">
      {size}
    </span>
  );
};

export default SizeIndicator;
