import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { UID_SNIPPET } from '../../constants';
import { pluginId, sanitizeCode } from '../../utils';

const InputMask = () => {
  const { config } = useSelector( state => state[ `${pluginId}_config` ] );
  const { modifiedData, onChange, slug } = useCMEditViewDataManager();
  const code = modifiedData?.code;

  useEffect( () => {
    if ( slug !== UID_SNIPPET || ! code ) {
      return;
    }

    onChange( {
      target: {
        name: 'code',
        value: sanitizeCode( code, config ),
        type: 'string',
      },
    } );
  }, [ code, slug, config, onChange ] );

  return null;
};

export default InputMask;
