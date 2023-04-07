'use strict';

const get = require( 'lodash/get' );

const { default: defaultConfig } = require( '../config' );
const { pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async get() {
    const config = await strapi.config.get( `plugin.${pluginId}`, defaultConfig );

    return config;
  },

  async uids() {
    const { contentTypes } = await this.get();
    const allowModels = get( contentTypes, 'allow', [] );
    const denyModels = get( contentTypes, 'deny', [] );

    const apiModels = Object.keys( strapi.contentTypes ).filter( uid => {
      return uid.includes( 'api::' ) && ! denyModels.includes( uid );
    } );
    const componentModels = Object.keys( strapi.components ).filter( uid => {
       return ! denyModels.includes( uid );
    } );
    const pluginModels = [ 'plugin::upload.file' ];

    return [
      ...apiModels,
      ...componentModels,
      ...pluginModels,
      ...allowModels,
    ];
  },
} );
