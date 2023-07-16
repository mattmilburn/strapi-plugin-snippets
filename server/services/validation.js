'use strict';

const { ValidationError } = require( '@strapi/utils' ).errors;

const { REGEX_ALPHANUMERIC_VAR } = require( '../constants' );

module.exports = () => ( {
  async validateFormat( value ) {
    const validFormat = REGEX_ALPHANUMERIC_VAR.test( value );

    if ( ! validFormat ) {
      throw new ValidationError( 'The code value may only contain letters, numbers, and underscores and must start with a letter.' );
    }
  },
} );
