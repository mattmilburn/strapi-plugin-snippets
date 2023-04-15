'use strict';

const { transformSnippets } = require( './middlewares' );

module.exports = async params => {
  // Middlewares.
  await transformSnippets( params );
};
