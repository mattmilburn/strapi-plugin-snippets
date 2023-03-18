'use strict';

const lifecycles = require( './snippet/lifecycles' );
const schema = require( './snippet/schema' );

module.exports = {
  'snippet': {
    schema,
    lifecycles,
  },
};
