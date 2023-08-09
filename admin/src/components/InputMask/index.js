import { useEffect } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { UID_SNIPPET } from '../../constants';
import { usePluginConfig } from '../../hooks';
import { sanitizeCode } from '../../utils';

const InputMask = () => {
  const { data: config } = usePluginConfig();
  const { modifiedData, onChange, slug } = useCMEditViewDataManager();
  const code = modifiedData?.code;

  useEffect(() => {
    if (slug !== UID_SNIPPET || !code) {
      return;
    }

    onChange({
      target: {
        name: 'code',
        value: sanitizeCode(code, config),
        type: 'string',
      },
    });
  }, [code, slug, config, onChange]);

  return null;
};

export default InputMask;
