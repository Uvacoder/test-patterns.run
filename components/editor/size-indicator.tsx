/* eslint-disable @typescript-eslint/unbound-method */

import * as React from "react";

import { useEditorStore } from "~store/editor";

const SizeIndicator: React.FC = () => {
  const size = useEditorStore(React.useCallback((store) => store.size, []));

  return (
    <span className="py-2 px-4 tabular-nums" id="pattern-size">
      {size}
    </span>
  );
};

export default SizeIndicator;
