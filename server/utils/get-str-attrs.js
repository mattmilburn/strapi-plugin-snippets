'use strict';

const getStrAttrs = uid => {
  const model = strapi.getModel( uid );

  if ( ! model ) {
    return [];
  }

  const attrs = model.attributes;
  const supportedFieldTypes = [ 'customField', 'richtext', 'string', 'text' ];

  return Object.keys( attrs ).filter( key => {
    return supportedFieldTypes.includes( attrs[ key ].type );
  } );
};

module.exports = getStrAttrs;
