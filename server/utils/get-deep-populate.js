'use strict';

// function getPopulateForDZ( attr, level ) {
//   const populatedComponents = ( attr.components || [] ).reduce( ( acc, componentUID ) => ( {
//     ...acc,
//     [ componentUID ]: {
//       populate: getDeepPopulate( componentUID, level + 1 ),
//     },
//   } ), {} );
//
//   return {
//     on: populatedComponents,
//   };
// }

function getPopulateFor( name, model, level ) {
  const attr = model.attributes[ name ];

  switch ( attr.type ) {
    case 'component':
      return {
        [ name ]: {
          populate: getDeepPopulate( attr.component, level + 1 ),
        },
      };

    // case 'dynamiczone':
    //   return {
    //     [ name ]: getPopulateForDZ( attr, level ),
    //   };

    default:
      return {};
  }
}

const getDeepPopulate = ( uid, level = 1 ) => {
  const maxLevel = Infinity;

  if ( level > maxLevel ) {
    return {};
  }

  const model = strapi.getModel( uid );

  return Object.keys( model.attributes ).reduce( ( acc, name ) => ( {
    ...acc,
    ...getPopulateFor( name, model, level ),
  } ), {} );
};

module.exports = getDeepPopulate;
