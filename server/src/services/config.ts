import { type Core, type UID } from '@strapi/strapi';
import get from 'lodash/get';

import { defaultConfig, type SnippetsPluginConfig } from '../config';
import { PLUGIN_ID } from '../constants';

export type ConfigService = ReturnType<typeof configService>;

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get(): Promise<SnippetsPluginConfig> {
    const config = await strapi.config.get(`plugin::${PLUGIN_ID}`, defaultConfig);

    return config;
  },

  async uids(): Promise<UID.ContentType[]> {
    const { contentTypes } = await this.get();
    const allowModels = get(contentTypes, 'allow', []);
    const denyModels = get(contentTypes, 'deny', []);

    const apiModels = Object.keys(strapi.contentTypes).filter((uid: UID.ContentType) => {
      return uid.includes('api::') && !denyModels.includes(uid);
    });
    const componentModels = Object.keys(strapi.components).filter((uid: UID.ContentType) => {
      return !denyModels.includes(uid);
    });
    const pluginModels = ['plugin::upload.file'];

    return [...apiModels, ...componentModels, ...pluginModels, ...allowModels];
  },
});

export default configService;
