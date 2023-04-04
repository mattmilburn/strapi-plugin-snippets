'use strict';

const getStrAttrs = uid => {
  const schema = strapi.contentTypes[ uid ];

  if ( ! schema ) {
    return [];
  }

  const attrs = schema.attributes;
  const supportedFieldTypes = [ 'customField', 'richtext', 'string', 'text' ];

  return Object.keys( attrs ).filter( key => {
    return supportedFieldTypes.includes( attrs[ key ].type );
  } );
};

module.exports = getStrAttrs;
