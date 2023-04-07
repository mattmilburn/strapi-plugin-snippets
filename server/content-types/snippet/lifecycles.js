'use strict';

const { getService, getStrAttrs } = require( '../../utils' );

module.exports = {
  beforeCreate: async event => {
    const { params } = event;
    const { data } = params;
    const config = await getService( 'config' ).get();

    // Maybe apply uppercase formatting to the `code` value.
    if ( config.uppercase ) {
      event.params.data.code = data.code.toUpperCase();
    }
  },

  beforeUpdate: async event => {
    const { model, params } = event;
    const { data, where } = params;
    const config = await getService( 'config' ).get();

    // Maybe apply uppercase formatting to the `code` value.
    if ( config.uppercase ) {
      event.params.data.code = data.code.toUpperCase();
    }

    // Store the previous state of the entity that is about to be updated.
    const entity = await strapi.db.query( model.uid ).findOne( { where } );

    if ( ! entity ) {
      return;
    }

    event.state = entity;
  },

  afterUpdate: async event => {
    const previousValue = event.state.code;
    const nextValue = event.result.code;

    if ( nextValue === previousValue ) {
      return;
    }

    const configService = getService( 'config' );
    const snippetService = getService( 'snippets' );
    const uids = await configService.uids();

    // Find entries using the previous `code` value so we can update them.
    const promisedFinds = await Promise.all( uids.map( uid => {
      const attrs = getStrAttrs( uid );
      const filters = {
        $or: attrs.map( attr => ( {
          [ attr ]: { $contains: `{${previousValue}}` },
        } ) ),
      };

      return strapi.entityService
        .findMany( uid, { filters } )
        .then( entries => {
          if ( ! entries || ! entries.length ) {
            // Always return an array, which helps normalize code that operates
            // with both singleType and collectionTypes.
            return [];
          }

          return entries
            .filter( entry => entry )
            .map( entry => ( {
              uid,
              attrs,
              entries,
            } ) );
        } );
    } ) );

    // Update entries to replace the previous `code` value with the new one.
    const promisedUpdates = promisedFinds.flat().map( ( { uid, attrs, entries } ) => {
      return entries.map( entry => {
        const data = attrs.reduce( ( acc, attr ) => ( {
          ...acc,
          [ attr ]: snippetService.updateSnippetInValue(
            entry[ attr ],
            previousValue,
            nextValue
          ),
        } ), {} );

        return strapi.entityService.update( uid, entry.id, { data } );
      } );
    } );

    await Promise.all( promisedUpdates );
  },
};
