import { useEffect, type ChangeEvent } from 'react';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

import { UID_SNIPPET } from '../../constants';
import { usePluginConfig } from '../../hooks';
import { sanitizeCode } from '../../utils';

const InputMask = () => {
  const { form, slug } = useContentManagerContext();
  const { data: config } = usePluginConfig();
  const { onChange, values } = form;
  const code = values?.code;

  useEffect(() => {
    if (slug !== UID_SNIPPET || !code) {
      return;
    }

    const sanitizedCode = sanitizeCode(code, config);

    // Only call `onChange` if the sanitized value is different.
    if (code !== sanitizedCode) {
      onChange({
        target: {
          name: 'code',
          value: sanitizedCode,
          type: 'string',
        },
      } as ChangeEvent<any>);
    }
  }, [code, slug, config, onChange]);

  return null;
};

export default InputMask;
