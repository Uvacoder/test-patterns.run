/* eslint-disable @typescript-eslint/unbound-method */

import * as React from "react";

import Link from "~components/link";
import { useEditorStore } from "~store/editor";
import theme from "~theme/prism";

import Decrement from "./decrement";
import Increment from "./increment";
import Renderer, { transformer } from "./renderer";
import SizeIndicator from "./size-indicator";

import { toClipboard } from "copee";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import shallow from "zustand/shallow";

function createGitHubLink(name: string) {
  return `https://github.com/grikomsn/console-patterns/blob/main/patterns/${name}`;
}

const Editor: React.FC = () => {
  const [title, source, updateSource, reset] = useEditorStore(
    (store) => [store.title, store.source, store.updateSource, store.reset],
    shallow,
  );

  React.useEffect(() => {
    document.querySelector("textarea").focus();
  }, []);

  return (
    <LiveProvider
      code={source}
      scope={{ Renderer }}
      theme={theme}
      transformCode={transformer}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="flex flex-col px-8 py-4 bg-gray-900 rounded shadow lg:col-span-3">
          <div className="text-center">
            <h6 className="mt-0">{title}</h6>
            <p className="mb-2 text-sm text-gray-600">
              You can click or tap the snippet below and edit the code which
              generates the pattern
            </p>
          </div>

          <div className="flex flex-col flex-grow pb-4 md:flex-row">
            <div className="overflow-x-auto text-sm lg:text-base">
              <LiveEditor onChange={updateSource} />
              <LiveError />
            </div>
          </div>

          <div className="text-sm text-center">
            <button className="link" onClick={reset} type="reset">
              Reset
            </button>
            <span className="mx-2">/</span>
            <button
              className="link"
              onClick={() => toClipboard(source)}
              type="button"
            >
              Copy to clipboard
            </button>
            <span className="mx-2">/</span>
            <Link href={createGitHubLink(`${title}.pattern.js`)}>
              View on GitHub
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 bg-gray-900 rounded shadow lg:col-span-2">
          <div className="text-center">
            <Decrement />
            <SizeIndicator />
            <Increment />
          </div>
          <pre className="flex-grow py-8 overflow-x-auto">
            <LivePreview />
          </pre>
          <div className="text-center">
            <Decrement />
            <SizeIndicator />
            <Increment />
          </div>
        </div>
      </div>
    </LiveProvider>
  );
};

export default Editor;
