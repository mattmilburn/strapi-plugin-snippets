import { getService } from '../utils';

const snippetsController = () => ({
  async config(ctx) {
    const config = await getService('config').get();

    ctx.send({ config });
  },
});

export default snippetsController;
