/* eslint-disable @typescript-eslint/unbound-method */

import * as React from "react";

import { useEditorStore } from "~store/editor";

const Decrement: React.FC = () => {
  const [dec, size] = useEditorStore(
    React.useCallback((store) => [store.decrement, store.size], []),
  );

  const shouldDisable = React.useMemo(() => size < 2, [size]);

  return (
    <button
      className="px-2 text-gray-900 bg-gray-400 rounded-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
      disabled={shouldDisable}
      onClick={dec}
      type="button"
    >
      -
    </button>
  );
};

export default Decrement;
