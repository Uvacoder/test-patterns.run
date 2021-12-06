import * as React from "react";

import PatternPage from "@/pages/pattern/[name]";

const example = `for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    // TODO: print("* ");
  }
  newline();
}`;

export default function PlaygroundPage() {
  return <PatternPage name="playground" source={example} />;
}
