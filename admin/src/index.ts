import { InputMask } from './components';
import reducers from './reducers';
import { PLUGIN_ID, PLUGIN_NAME } from './constants';

export default {
  register(app: any) {
    app.addReducers(reducers);

    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_NAME,
    });
  },

  bootstrap(app: any) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: PLUGIN_ID,
      Component: InputMask,
    });
  },
};
