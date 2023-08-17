import { InputMask } from './components';
import reducers from './reducers';
import { pluginId, pluginName } from './utils';

export default {
  register(app) {
    app.addReducers(reducers);

    app.injectContentManagerComponent('editView', 'right-links', {
      name: pluginId,
      Component: InputMask,
    });

    app.registerPlugin({
      id: pluginId,
      name: pluginName,
    });
  },
};
