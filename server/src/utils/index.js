'use strict';

const getService = require('./get-service');
const getStrAttrs = require('./get-str-attrs');
const interpolate = require('./interpolate');
const isApiRequest = require('./is-api-request');
const pluginId = require('./plugin-id');

module.exports = {
  getService,
  getStrAttrs,
  interpolate,
  isApiRequest,
  pluginId,
};
