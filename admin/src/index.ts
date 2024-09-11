import { InputMask } from './components';
import reducers from './reducers';
import { pluginId, pluginName } from './utils';

export default {
  register(app: any) {
    app.addReducers(reducers);

    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: pluginId,
      Component: InputMask,
    });

    app.registerPlugin({
      id: pluginId,
      name: pluginName,
    });
  },
};
