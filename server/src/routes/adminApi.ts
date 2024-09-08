const adminApiRoutes = {
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

export default adminApiRoutes;
