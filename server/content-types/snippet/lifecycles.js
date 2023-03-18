'use strict';

module.exports = {
  beforeUpdate: async event => {
    const { model, params } = event;
    const { where } = params;

    const entity = await strapi.db.query( model.uid ).findOne( { where } );

    if ( ! entity ) {
      return;
    }

    event.state = entity;
  },

  afterUpdate: async event => {
    const { code: previousValue } = event.state;
    const nextValue = event.params.result.code;

    if ( nextValue !== previousValue ) {
      /**
       * @TODO Update collections with new code name.
       */
    }
  },
};
