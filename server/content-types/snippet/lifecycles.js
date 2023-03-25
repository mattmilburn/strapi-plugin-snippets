'use strict';

const { getService } = require( '../../utils' );

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
    const previousValue = event.state.code;
    const nextValue = event.result.code;

    if ( nextValue === previousValue ) {
      return;
    }

    const snippetService = getService( 'snippets' );
    const uids = snippetService.uids();
    const containsQuery = { $contains: `{${previousValue}}` };

    // Find entries using the previous `code` value so we can update them.
    const promisedFinds = await Promise.all( uids.map( uid => {
      const attrs = snippetService.getStringAttrs( uid );
      const filters = {
        $or: attrs.map( attr => ( {
          [ attr ]: containsQuery,
        } ) ),
      };

      /**
       * @TODO - Maybe populate * here?
       */
      return strapi.entityService
        .findMany( uid, { filters } )
        .then( entries => {
          if ( ! entries ) {
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
