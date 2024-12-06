import { type Core } from '@strapi/strapi';
import has from 'lodash/has';
import head from 'lodash/head';
import isPlainObject from 'lodash/isPlainObject';
import omit from 'lodash/omit';

import { getService, interpolate, isApiRequest } from '../utils';

const ignoreFields = ['id', '__component', 'createdAt', 'publishedAt', 'updatedAt', 'locale'];

// Transform function used to transform the response object.
const transform = (data: object, config, snippets): any => {
  if (!data) {
    return data;
  }

  // Entity or relation wrapper.
  if (has(data, 'data')) {
    return {
      ...data,
      data: transform(data.data, config, snippets),
    };
  }

  // Entity or relation data.
  if (has(data, 'attributes')) {
    return {
      ...data,
      attributes: transform(data.attributes, config, snippets),
    };
  }

  // Support strapi-plugin-transformer features which might remove `attributes`
  // and `data` wrappers.
  if (has(data, 'id')) {
    return {
      ...data,
      // Must omit the id otherwise it creates an infinite loop.
      ...transform(omit(data, 'id'), config, snippets),
    };
  }

  // Collection of entities, relations, or components.
  if (
    Array.isArray(data) &&
    (has(head(data), 'attributes') || has(head(data), 'id') || has(head(data), '__component'))
  ) {
    return data.map((item) => transform(item, config, snippets));
  }

  // Loop to transform properties.
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

    if (!ctx.body || !ctx.body.data || !isApiRequest(ctx)) {
      return;
    }

    // Do nothing if this model is not supported or there are no snippets in the database.
    const config = await getService('config').get();
    const uids = await getService('config').uids();
    const uid = uids.find((_uid) => ctx.state.route.handler.includes(_uid));
    const snippets = await getService('snippets').get();

    if (!uid || !snippets) {
      return;
    }

    ctx.body.data = transform(ctx.body.data, config, snippets);
  });
};

export default transformMiddleware;
