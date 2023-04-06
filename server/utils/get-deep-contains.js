'use strict';

// 'content.blank': {
//   collectionName: 'components_content_blanks',
//   info: [Object],
//   options: {},
//   attributes: [Object],
//   __filename__: 'blank.json',
//   __schema__: [Object],
//   uid: 'content.blank',
//   category: 'content',
//   modelType: 'component',
//   modelName: 'blank',
//   globalId: 'ComponentContentBlank'
// },

const omit = require( 'lodash/omit' );

// function getContainsForDZ( attr, containsQuery, level ) {
//   return ( attr.components || [] ).map( componentUID => ( {
//     __component: componentUID,
//     ...getDeepContains( componentUID, containsQuery, level + 1 ),
//   } ) );
// }

function getContainsFor( name, model, containsQuery, level ) {
  const attr = model.attributes[ name ];

  switch ( attr.type ) {
    case 'richtext':
    case 'string':
    case 'text':
      return {
        [ name ]: containsQuery,
      };

    case 'component':
      return {
        [ name ]: getDeepContains( attr.component, containsQuery, level + 1 ),
      };

    // case 'dynamiczone':
    //   return {
    //     [ name ]: getContainsForDZ( attr, containsQuery, level ),
    //   };

    default:
      return {};
  }
}

const getDeepContains = ( uid, containsQuery, level = 1 ) => {
  const maxLevel = Infinity;

  if ( level > maxLevel ) {
    return {};
  }

  const model = strapi.getModel( uid );
  const attrs = omit( model.attributes, [
    'createdAt',
    'createdBy',
    'folder',
    'folderPath',
    'locale',
    'provider',
    'publishedAt',
    'updatedAt',
    'updatedBy',
  ] );

  const deepContainsQuery = Object.keys( attrs ).reduce( ( acc, name ) => ( {
    ...acc,
    ...getContainsFor( name, model, containsQuery, level ),
  } ), {} );

  // Top-level data is an array of objects.
  if ( level === 1 ) {
    return Object.entries( deepContainsQuery ).map( ( [ key, value ] ) => ( {
      [ key ]: value,
    } ) );
  }

  return deepContainsQuery;
};

module.exports = getDeepContains;
