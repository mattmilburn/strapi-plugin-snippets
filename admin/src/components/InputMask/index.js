import { useEffect } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { UID_SNIPPET } from '../../constants';
import { sanitizeCode } from '../../utils';

const InputMask = () => {
  const { modifiedData, onChange, slug } = useCMEditViewDataManager();
  const code = modifiedData?.code;

  useEffect( () => {
    if ( slug !== UID_SNIPPET || ! code ) {
      return;
    }

    onChange( {
      target: {
        name: 'code',
        value: sanitizeCode( code ),
        type: 'string',
      },
    } );
  }, [ code, slug ] );

  return null;
};

export default InputMask;
