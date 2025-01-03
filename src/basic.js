var debug = require('debug')('error-handler');

function handler(err, req, res, next) {
  var status = err.status || err.code;

  if (!isHttpStatus(status)) status = 500;
  if (status >= 500) debug({ error: err });

  return res.status(status).json({ message: err.message });
}

function isHttpStatus(status) {
  return status >= 200 && status < 512;
}

module.exports = function () {
  return handler;
};
