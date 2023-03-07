'use strict';

const interpolate = ( str, data = {} ) => {
  Object.entries( data ).forEach( ( [ key, value ] ) => {
    str = str.replace( new RegExp( `{${key}}`, 'g' ), value );
  } );

  // Replace any remaining values with an empty string.
  str = str.replace( new RegExp( `{[A-Za-z0-9-_.~]+}`, 'g' ), '' ).trim();

  return str;
};

module.exports = interpolate;
