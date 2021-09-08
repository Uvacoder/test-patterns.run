const path = require("path");

/**
 * @param {string[]} rest
 * @returns {string}
 */
module.exports = function cwd(...rest) {
  return path.join(process.cwd(), ...rest);
};
