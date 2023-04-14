'use strict';

const { createCoreController } = require( '@strapi/strapi' ).factories;

const { UID_SNIPPET } = require( '../constants' );
const { getService } = require( '../utils' );

module.exports = createCoreController( UID_SNIPPET, ( { strapi } ) =>  ( {
  async config( ctx ) {
    const config = await getService( 'config' ).get();

    ctx.send( { config } );
  },
} ) );
