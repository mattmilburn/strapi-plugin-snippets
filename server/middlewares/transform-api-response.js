'use strict';

const has = require( 'lodash/has' );
const head = require( 'lodash/head' );
const isArray = require( 'lodash/isArray' );
const isString = require( 'lodash/isString' );

const { getService, interpolate, isApiRequest } = require( '../utils' );

// Transform function which is used to transform the response object.
const transform = ( data, snippets ) => {
  // Single entry.
  if ( has( data, 'attributes' ) ) {
    return transform( data.attributes, snippets );
  }

  // Collection of entries.
  if ( isArray( data ) && data.length && has( head( data ), 'attributes' ) ) {
    return data.map( item => transform( item, snippets ) );
  }

  // Loop through properties.
  Object.entries( data ).forEach( ( [ key, value ] ) => {
    if ( ! value ) {
      return;
    }

    // Single component.
    if ( has( value, 'id' ) ) {
      data[ key ] = transform( value, snippets );
    }

    // Repeatable component or dynamic zone.
    if ( isArray( value ) && has( head( value ), 'id' ) ) {
      data[ key ] = value.map( component => transform( component, snippets ) );
    }

    // Finally, replace the shortcode in string values.
    if ( isString( value ) ) {
      data[ key ] = interpolate( value, snippets );
    }
  } );

  return data;
};

// Transform API response by parsing data string to JSON for rich text fields.
module.exports = async ( { strapi } ) => {
  strapi.server.use( async ( ctx, next ) => {
    await next();

    if (
      ! ctx.body ||
      ! ctx.body.data ||
      ! isApiRequest( ctx )
    ) {
      return;
    }

    // Do nothing if there are no snippets in the database.
    const snippets = await getService( 'snippets' ).get();

    if ( ! snippets ) {
      return;
    }

    ctx.body.data = transform( ctx.body.data, snippets );
  } );
};
