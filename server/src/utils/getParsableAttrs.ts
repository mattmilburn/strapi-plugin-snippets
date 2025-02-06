import { type UID } from '@strapi/strapi';

const getParsableAttrs = (uid: UID.ContentType): string[] => {
  const model = strapi.getModel(uid);

  if (!model) {
    return [];
  }

  const attrs = model.attributes;
  const supportedFieldTypes = ['blocks', 'customField', 'email', 'richtext', 'string', 'text'];

  return Object.keys(attrs).filter((key) => {
    return supportedFieldTypes.includes(attrs[key].type);
  });
};

export default getParsableAttrs;
