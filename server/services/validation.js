'use strict';

const { ValidationError } = require( '@strapi/utils' ).errors;

const { REGEX_SNIPPET_CODE } = require( '../constants' );

module.exports = ( { strapi } ) => ( {
  async validateFormat( value ) {
    const validFormat = REGEX_SNIPPET_CODE.test( value );

    if ( ! validFormat ) {
      throw new ValidationError( 'The code value may only contain letters, numbers, and underscores and must start with a letter.' );
    }
  },
} );
