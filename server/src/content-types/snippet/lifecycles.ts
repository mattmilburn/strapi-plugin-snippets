import { getService } from '../../utils';

const snippetsLifecycles = {
  beforeCreate: async (event) => {
    const { params } = event;
    const { data } = params;

    getService('validation').validateFormat(data.code);

    // Maybe apply uppercase formatting to the `code` value.
    const config = await getService('config').get();

    if (config.uppercase) {
      event.params.data.code = data.code.toUpperCase();
    }
  },

  beforeUpdate: async (event) => {
    const { model, params } = event;
    const { data, where } = params;

    getService('validation').validateFormat(data.code);

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

    if (!previousValue || nextValue === previousValue) {
      return;
    }

    const snippetService = getService('snippets');
    const uids = await getService('config').uids();

    // Find entries using the previous `code` value so we can update them.
    const targetEntries = await snippetService.getEntriesWithSnippet(uids, previousValue);

    // Update entries to replace the previous `code` value with the new one.
    await snippetService.updateEntriesWithSnippet(targetEntries, previousValue, nextValue);
  },
};

export default snippetsLifecycles;
