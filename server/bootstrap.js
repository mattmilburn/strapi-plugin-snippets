'use strict';

const transformApiResponseMiddleware = require( './middlewares/transform-api-response' );

module.exports = async params => {
  await transformApiResponseMiddleware( params );
};
