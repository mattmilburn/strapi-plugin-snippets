'use strict';

const { default: defaultConfig } = require( '../config' );
const { pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async get() {
    const config = await strapi.config.get( `plugin.${pluginId}`, defaultConfig );

    return config;
  },

  async uids() {
    const { contentTypes } = await this.get();
    const allowUIDs = contentTypes.allow || [];
    const denyUIDs = contentTypes.deny || [];

    const apiModels = Object.keys( strapi.contentTypes ).filter( uid => {
      return uid.includes( 'api::' ) && ! denyUIDs.includes( uid );
    } );
    const componentModels = Object.keys( strapi.components ).filter( uid => {
       return ! denyUIDs.includes( uid );
    } );
    const pluginModels = [ 'plugin::upload.file' ];

    return [
      ...apiModels,
      ...componentModels,
      ...pluginModels,
      ...allowUIDs,
    ];
  },
} );
