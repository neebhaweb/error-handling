const basic = require('./basic');
const rollbar = require('./rollbar');

module.exports = function (app) {
  app = app || this;

  if (process.env.ROLLBAR_TOKEN) app.use(rollbar());
  app.use(basic());
};
