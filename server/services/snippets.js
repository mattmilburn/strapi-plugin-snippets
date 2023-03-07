'use strict';

module.exports = ( { strapi } ) => ( {
  async get() {
    return strapi.entityService
      .findMany( 'plugin::snippets.snippet' )
      .then( results => results.reduce( ( acc, result ) => ( {
        ...acc,
        [ result.code ]: result.replacement,
      } ), {} ) );
  },
} );
