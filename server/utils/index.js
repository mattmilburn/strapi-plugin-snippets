'use strict';

const getDeepContains = require( './get-deep-contains' );
const getDeepPopulate = require( './get-deep-populate' );
const getService = require( './get-service' );
const getStrAttrs = require( './get-str-attrs' );
const interpolate = require( './interpolate' );
const isApiRequest = require( './is-api-request' );
const pluginId = require( './plugin-id' );

module.exports = {
  getDeepContains,
  getDeepPopulate,
  getService,
  getStrAttrs,
  interpolate,
  isApiRequest,
  pluginId,
};
