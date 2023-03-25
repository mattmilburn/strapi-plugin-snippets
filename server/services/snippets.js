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

  getStringAttrs( uid ) {
    const schema = strapi.contentTypes[ uid ];

    if ( ! schema ) {
      return [];
    }

    const attrs = schema.attributes;

    return Object.keys( attrs ).filter( key => {
      return [ 'customField', 'richtext', 'string', 'text' ].includes( attrs[ key ].type );
    } );
  },

  uids() {
    /**
     * @TODO - Include file uploads here.
     */

    return Object.keys( strapi.contentTypes ).filter( key => key.includes( 'api::' ) );
  },

  updateSnippetInValue( value, oldCode, newCode ) {
    return value.replace( `{${oldCode}}`, `{${newCode}}` );
  },
} );
