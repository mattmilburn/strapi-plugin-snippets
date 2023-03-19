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
        /**
         * @TODO - Differentiate between single and collection types.
         */
        .findMany( uid, { filters } )
        .then( results => {
          if ( ! results ) {
            return;
          }

          return results
            .filter( result => result )
            .map( result => ( {
              uid,
              attrs,
              results,
            } ) );
        } );
    } ) );

    console.log( 'WILL UPDATE', promisedFinds );

    // // Update entries to replace the previous `code` value with the new one.
    // const promisedUpdates = promisedFinds.map( ( { uid, attrs, entries } ) => {
    //   //
    // } );
    //
    // await Promise.all( promisedUpdates.flat() );
  },
};
