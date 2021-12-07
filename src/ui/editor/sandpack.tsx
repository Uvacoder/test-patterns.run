import * as React from "react";

import dynamic from "next/dynamic";

const Sandpack = dynamic(() => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack), { ssr: false });

const cssCode = `html,
body {
  background-color: #101113;
  color: #C1C2C5;
  margin: 0;
  padding: 0;
}
pre {
  padding: 0 2ch;
}`.trim();

const htmlCode = (name: string) =>
  `<!DOCTYPE html>
<html>
<head>
  <title>${name}</title>
  <meta charset="UTF-8" />
</head>
<body>
  <pre id="pattern"></pre>
  <script src="src/index.js">
  </script>
</body>
</html>`.trim();

const mainCode = `import "./style.css";
import { patternRunner } from "pattern-runner";
import source from "!!raw-loader!./pattern.js";
document.getElementById("pattern").innerHTML = patternRunner(source, "inline");`.trim();

interface SandpackEditorProps {
  name: string;
  source: string;
}

export default function SandpackEditor({ name, source }: SandpackEditorProps) {
  return (
    <Sandpack
      customSetup={{
        environment: "parcel",
        dependencies: {
          "pattern-runner": "latest",
        },
        files: {
          "/index.html": {
            code: htmlCode(name),
            hidden: true,
          },
          "/src/index.js": {
            code: mainCode,
            hidden: true,
          },
          "/src/pattern.js": {
            code: `const size = 5;\n\n${source}`,
            active: true,
          },
          "/src/style.css": {
            code: cssCode,
            hidden: true,
          },
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
