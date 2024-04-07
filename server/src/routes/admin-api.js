'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'snippet.config',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
