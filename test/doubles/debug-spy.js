const requireSubvert = require('require-subvert')(__dirname);
const Debug = require('debug');
const sinon = require('sinon');

const spy = sinon.spy();
const debugWithSpy = (key) => {
  const debug = Debug(key);
  if (key === 'error-handler') return (message) => spy(debug(message));

  return debug;
};
requireSubvert.subvert('debug', debugWithSpy);

module.exports = spy;
