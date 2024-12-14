import { type Core } from '@strapi/strapi';
import isPlainObject from 'lodash/isPlainObject';

import { getService, interpolate, isApiRequest } from '../utils';

const ignoreFields = ['id', '__component', 'createdAt', 'publishedAt', 'updatedAt', 'locale'];

// Transform function used to transform the response object.
const transform = (data: object, config, snippets): any => {
  if (!data) {
    return data;
  }

  // Transform arrays of data.
  if (Array.isArray(data)) {
    return data.map((item) => transform(item, config, snippets));
  }

  // Transform object properties.
  if (isPlainObject(data)) {
    Object.entries(data).forEach(([key, value]) => {
      if (ignoreFields.includes(key)) {
        return;
      }

      data[key] = transform(value, config, snippets);
    });
  }

  // Finally, replace the shortcode in string values.
  if (typeof data === 'string') {
    return interpolate(data, snippets, config.ignoreUnmatched);
  }

  return data;
};

// Transform API response.
const transformMiddleware = async (strapi: Core.Strapi) => {
  strapi.server.use(async (ctx, next) => {
    await next();

    if (!ctx?.body?.data || !isApiRequest(ctx)) {
      return;
    }

    const snippets = await getService('snippets').get();
    const config = await getService('config').get();
    const uids = await getService('config').uids();
    const uid = uids.find((_uid) => ctx.state.route.handler.includes(_uid));

    // Do nothing if this model is not supported or there are no snippets in the database.
    if (!uid || !snippets) {
      return;
    }

    ctx.body.data = transform(ctx.body.data, config, snippets);
  });
};

export default transformMiddleware;
