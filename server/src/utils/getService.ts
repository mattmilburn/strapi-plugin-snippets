import pluginId from './pluginId';

import { type SnippetsServices } from 'src/services';

const getService = <TName extends keyof SnippetsServices>(name: TName): SnippetsServices[TName] =>
  global.strapi.plugin(pluginId).service<SnippetsServices[TName]>(name);

export default getService;
