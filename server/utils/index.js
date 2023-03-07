'use strict';

const getService = require( './get-service' );
const interpolate = require( './interpolate' );
const isApiRequest = require( './is-api-request' );
const pluginId = require( './plugin-id' );

module.exports = {
  getService,
  interpolate,
  isApiRequest,
  pluginId,
};
