import { useEffect } from 'react';
import { useForm } from '@strapi/strapi/admin';
// import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

// import { UID_SNIPPET } from '../../constants';
import { usePluginConfig } from '../../hooks';
// import { sanitizeCode } from '../../utils';

const InputMask = () => {
  // const { modifiedData, onChange, slug } = useEditManager();
  // const doc = useContentManagerContext();
  // console.log('DOCUMENT', doc);
  const modifiedData = useForm('ActionName', ({ values }: any) => values);
  console.log('MODIFIED', modifiedData);
  const { data: config } = usePluginConfig();
  // const code = modifiedData?.code;
  // console.log('INPUT', code);

  useEffect(() => {
    console.log('EFFECT', modifiedData);
  //   if (slug !== UID_SNIPPET || !code) {
  //     return;
  //   }

  //   const sanitizedCode = sanitizeCode(code, config);

  //   // Only call `onChange` if the sanitized value is different.
  //   if (code === sanitizedCode) {
  //     return;
  //   }

  //   onChange({
  //     target: {
  //       name: 'code',
  //       value: sanitizedCode,
  //       type: 'string',
  //     },
  //   });
  // }, [code, slug, config, onChange]);
  }, [config, modifiedData]);

  return null;
};

export default InputMask;
