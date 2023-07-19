'use strict';

const has = require('lodash/has');

const { getService, getStrAttrs } = require('../../utils');

module.exports = {
  beforeCreate: async (event) => {
    const { params } = event;
    const { data } = params;

    await getService('validation').validateFormat(data.code);

    // Maybe apply uppercase formatting to the `code` value.
    const config = await getService('config').get();

    if (config.uppercase) {
      event.params.data.code = data.code.toUpperCase();
    }
  },

  beforeUpdate: async (event) => {
    const { model, params } = event;
    const { data, where } = params;

    await getService('validation').validateFormat(data.code);

    // Maybe apply uppercase formatting to the `code` value.
    const config = await getService('config').get();

    if (config.uppercase) {
      event.params.data.code = data.code.toUpperCase();
    }

    // Store the previous state of the entity that is about to be updated.
    const entity = await strapi.db.query(model.uid).findOne({ where });

    if (!entity) {
      return;
    }

    event.state = entity;
  },

  afterUpdate: async (event) => {
    const previousValue = event.state.code;
    const nextValue = event.result.code;

    if (nextValue === previousValue) {
      return;
    }

    /**
     * @TODO - Refactor the logic below into service methods.
     */

    const configService = getService('config');
    const snippetService = getService('snippets');
    const uids = await configService.uids();

    // Find entries using the previous `code` value so we can update them.
    const promisedFinds = await Promise.all(
      uids.map((uid) => {
        const attrs = getStrAttrs(uid);
        const filters = {
          $or: attrs.map((attr) => ({
            [attr]: { $contains: `{${previousValue}}` },
          })),
        };

        return strapi.entityService.findMany(uid, { filters }).then((entries) => {
          // Return singleType results.
          if (has(entries, 'id')) {
            return {
              uid,
              attrs,
              entries: [entries],
            };
          }

          // Return collectionType results.
          if (entries && entries.length) {
            return {
              uid,
              attrs,
              entries: entries.filter((entry) => entry),
            };
          }

          return null;
        });
      })
    );

    // Update entries to replace the previous `code` value with the new one.
    const promisedUpdates = promisedFinds
      .filter((i) => i)
      .map(({ uid, attrs, entries }) => {
        return entries.map((entry) => {
          const data = attrs.reduce(
            (acc, attr) => ({
              ...acc,
              [attr]: snippetService.updateSnippetInValue(entry[attr], previousValue, nextValue),
            }),
            {}
          );

          return strapi.entityService.update(uid, entry.id, { data });
        });
      });

    await Promise.all(promisedUpdates);
  },
};
