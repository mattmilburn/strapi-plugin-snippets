import { InputMask } from './components';
import { pluginId, pluginName } from './utils';

export default {
  register( app ) {
    app.injectContentManagerComponent( 'editView', 'right-links', {
      name: pluginId,
      Component: InputMask,
    } );

    app.registerPlugin( {
      id: pluginId,
      name: pluginName,
    } );
  },
};
