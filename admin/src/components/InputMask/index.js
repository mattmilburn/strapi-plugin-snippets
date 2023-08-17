import { useEffect } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { UID_SNIPPET } from '../../constants';
import { usePluginConfig } from '../../hooks';
import { sanitizeCode } from '../../utils';

const InputMask = () => {
  const { modifiedData, onChange, slug } = useCMEditViewDataManager();
  const { data: config } = usePluginConfig();
  const code = modifiedData?.code;

  useEffect(() => {
    if (slug !== UID_SNIPPET || !code) {
      return;
    }

    const sanitizedCode = sanitizeCode(code, config);

    // Only call `onChange` if the sanitized value is different.
    if (code === sanitizedCode) {
      return;
    }

    onChange({
      target: {
        name: 'code',
        value: sanitizedCode,
        type: 'string',
      },
    });
  }, [code, slug, config, onChange]);

  return null;
};

export default InputMask;
