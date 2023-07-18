'use strict';

// eslint-disable-next-line node/no-missing-require
const { createCoreController } = require('@strapi/strapi').factories;

const { UID_SNIPPET } = require('../constants');
const { getService } = require('../utils');

module.exports = createCoreController(UID_SNIPPET, () => ({
  async config(ctx) {
    const config = await getService('config').get();

    ctx.send({ config });
  },
}));
