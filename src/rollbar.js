module.exports = function () {
  var Rollbar = require('rollbar');
  var rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    handleUncaughtExceptions: true,
    handleUnhandledRejections: true
  });
  return rollbar.errorHandler();
};
