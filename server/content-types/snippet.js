'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'snippets',
  info: {
    displayName: 'Snippet',
    singularName: 'snippet',
    pluralName: 'snippets',
    tableName: 'snippets',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
  attributes: {
    code: {
      type: 'uid',
      help: 'Put this code in curly braces {} to use it.',
      required: true,
    },
    replacement: {
      type: 'string',
      help: 'The final API value.',
      required: true,
    },
  },
};
