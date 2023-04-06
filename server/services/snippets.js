'use strict';

const { UID_SNIPPET } = require( '../constants' );

module.exports = ( { strapi } ) => ( {
  async get() {
    return strapi.entityService
      .findMany( UID_SNIPPET )
      .then( results => results.reduce( ( acc, result ) => ( {
        ...acc,
        [ result.code ]: result.replacement,
      } ), {} ) );
  },

  uids() {
    const apiModels= Object.keys( strapi.contentTypes ).filter( key => key.includes( 'api::' ) );
    const pluginModels = [ 'plugin::upload.file' ];

    return [
      ...apiModels,
      ...pluginModels,
    ];
  },

  updateSnippetInValue( value, oldCode, newCode ) {
    if ( ! value || typeof value !== 'string' ) {
      return value;
    }

    return value.replace( `{${oldCode}}`, `{${newCode}}` );
  },
} );
