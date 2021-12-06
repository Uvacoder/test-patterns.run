/* eslint-disable no-new-func */

const DEFAULT_COMPUTE_SIZE = 5;

module.exports = {
  /**
   * @param {string} source
   * @param {number} size
   */
  computePattern(source, size = DEFAULT_COMPUTE_SIZE) {
    /** @type import("../types/pattern").PatternComputer */
    const computer = new Function("newline", "print", "size", source);
    let result = "";
    function newline() {
      result += "\n";
    }
    /** @param {string} s */
    function print(s) {
      result += s;
    }
    computer(newline, print, size);
    return result;
  },
};
