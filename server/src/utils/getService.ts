import { PLUGIN_ID } from '../constants';

import { type SnippetsServices } from 'src/services';

const getService = <TName extends keyof SnippetsServices>(name: TName): SnippetsServices[TName] =>
  global.strapi.plugin(PLUGIN_ID).service<SnippetsServices[TName]>(name);

export default getService;
