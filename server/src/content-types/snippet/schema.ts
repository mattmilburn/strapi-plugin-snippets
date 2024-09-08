const snippetsSchema = {
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
      type: 'string',
      required: true,
      unique: true,
    },
    replacement: {
      type: 'text',
      required: true,
    },
  },
};

export default snippetsSchema;
