'use strict';

const { default: defaultConfig } = require( '../config' );
const { pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async get() {
    const config = await strapi.config.get( `plugin.${pluginId}`, defaultConfig );

    return config;
  },

  /**
   * @TODO - Include plugin config options.
   */
  uids() {
    const apiModels = Object.keys( strapi.contentTypes ).filter( key => key.includes( 'api::' ) );
    const componentModels = Object.keys( strapi.components );
    const pluginModels = [ 'plugin::upload.file' ];

    return [
      ...apiModels,
      ...componentModels,
      ...pluginModels,
    ];
  },
} );
