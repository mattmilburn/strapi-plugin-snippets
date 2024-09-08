import { type Core } from '@strapi/strapi';
import { UID_SNIPPET } from '../constants';

import SnippetSchema from '../content-types/snippet/schema';

type SnippetsService = ReturnType<typeof snippetsService>

const snippetsService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get(): Promise<typeof SnippetSchema[]> {
    return strapi.entityService.findMany(UID_SNIPPET).then((results) =>
      results.reduce(
        (acc, result) => ({
          ...acc,
          [result.code]: result.replacement,
        }),
        {}
      )
    );
  },

  updateSnippetInValue(value: string, oldCode: string, newCode: string): string {
    if (!value || typeof value !== 'string') {
      return value;
    }

    return value.replace(`{${oldCode}}`, `{${newCode}}`);
  },
});

export { type SnippetsService };
export default snippetsService;
