import { LogicFunction } from "~types";

export default function createPattern(logic: LogicFunction) {
  return {
    test: (size: number) => {
      let out = "";

      function newline() {
        out += "\n";
      }

      function print(s: string) {
        out += s;
      }

      try {
        logic({ newline, print, size });
      } catch (error: unknown) {
        return String(error);
      }

      return out;
    },
  };
}
