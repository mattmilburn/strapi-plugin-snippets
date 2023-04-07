'use strict';

const interpolate = ( str, data = {}, ignoreUnmatched = false ) => {
  Object.entries( data ).forEach( ( [ key, value ] ) => {
    str = str.replace( new RegExp( `{${key}}`, 'g' ), value );
  } );

  // If `ignoreUnmatched` is false, replace any unmatched values with an empty
  // string, otherwise do nothing and leave them unparsed.
  if ( ! ignoreUnmatched ) {
    str = str.replace( new RegExp( `{[A-Za-z0-9-_.~]+}`, 'g' ), '' ).trim();
  }

  return str;
};

module.exports = interpolate;
