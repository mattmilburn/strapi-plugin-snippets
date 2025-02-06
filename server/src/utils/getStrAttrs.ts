import { type UID } from '@strapi/strapi';

const getStrAttrs = (uid: UID.ContentType): string[] => {
  const model = strapi.getModel(uid);

  if (!model) {
    return [];
  }

  const attrs = model.attributes;
  const supportedFieldTypes = ['customField', 'email', 'richtext', 'string', 'text'];

  return Object.keys(attrs).filter((key) => {
    return supportedFieldTypes.includes(attrs[key].type);
  });
};

export default getStrAttrs;
