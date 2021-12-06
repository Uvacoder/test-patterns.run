import * as React from "react";

import { cssCode, htmlCode, mainCode } from "@/utils/sandpack";

import dynamic from "next/dynamic";

const Sandpack = dynamic(() => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack), { ssr: false });

interface SandpackEditorProps {
  name: string;
  source: string;
  appendSize?: number | false;
}

export default function SandpackEditor({ name, source, appendSize = 5 }: SandpackEditorProps) {
  return (
    <Sandpack
      customSetup={{
        environment: "parcel",
        dependencies: {},
        files: {
          "/index.html": { code: htmlCode(name), hidden: true },
          "/src/index.js": { code: mainCode, hidden: true },
          "/src/pattern.js": { code: appendSize ? `const size = 5;\n\n${source}` : source, active: true },
          "/src/style.css": { code: cssCode, hidden: true },
        },
        entry: "/src/index.js",
        main: "/src/index.js",
      }}
      options={{
        initMode: "lazy",
        recompileMode: "immediate",
        showInlineErrors: true,
        showLineNumbers: true,
      }}
      theme="monokai-pro"
    />
  );
}
