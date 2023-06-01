export const verify = require('./verify');
export const sign = require('./sign');
export const JsonWebTokenError = require('./lib/JsonWebTokenError');
export const NotBeforeError = require('./lib/NotBeforeError');
export const TokenExpiredError = require('./lib/TokenExpiredError');
  
  Object.defineProperty(module.exports, 'decode', {
    enumerable: false,
    value: require('./decode'),
  });