/**
 * Format regex validation error
 *
 * @static
 * @param {Object} errors
 * @param {string} label
 * @returns {string} the error message
 * @method formatError
 * @memberof Validator
 */

const formatError = (errors, label, message) => {
  const err = errors[0];
  switch (err.type) {
    case "string.regex.base":
      return message || `${label || err.path} is inavlid`;
    default:
      return message || err;
  }
};
export default formatError;
