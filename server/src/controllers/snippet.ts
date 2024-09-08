import { factories } from '@strapi/strapi';

import { UID_SNIPPET } from '../constants';
import { getService } from '../utils';

const snippetsController = factories.createCoreController(UID_SNIPPET, () => ({
  async config(ctx) {
    const config = await getService('config').get();

    ctx.send({ config });
  },
}));

export default snippetsController;
