import { type Core } from '@strapi/strapi';

import { transformSnippets } from './middlewares';

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  // Middlewares.
  await transformSnippets(strapi);
};

export default bootstrap;
