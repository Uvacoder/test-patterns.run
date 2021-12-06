const cssCode = `html,body{background-color:#101113;color:#C1C2C5;margin:0;padding:0;}pre{padding:0 2ch;}`;

const htmlCode = (name) => `<!DOCTYPE html>
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
</html>`;

const mainCode = ` import "./style.css";
import source from "!!raw-loader!./pattern.js";
const computer = new Function("newline", "print", source);
let result = "";
function newline() {
  result += "\\n";
}
/** @param {string} s */
function print(s) {
  result += s;
}
computer(newline, print);
document.getElementById("pattern").innerHTML = result;
`;

module.exports = {
  cssCode,
  htmlCode,
  mainCode,
};
