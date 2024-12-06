import { type Core, type UID } from '@strapi/strapi';

import { UID_SNIPPET } from '../constants';
import { getStrAttrs } from '../utils';

export type SnippetsService = ReturnType<typeof snippetsService>;

export interface EntriesWithSnippet {
  uid: UID.ContentType;
  attrs: string[];
  entries: any[];
}

const snippetsService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get(): Promise<any> {
    const entries = strapi
      .documents(UID_SNIPPET)
      .findMany()
      .then((entries) =>
        entries.reduce(
          (acc, entry) => ({
            ...acc,
            [entry.code]: entry.replacement,
          }),
          {}
        )
      );

    return entries;
  },

  async getEntriesWithSnippet(
    uids: UID.ContentType[],
    previousValue: string
  ): Promise<EntriesWithSnippet[]> {
    const entries = await Promise.all(
      uids.map((uid) => {
        const attrs = getStrAttrs(uid);
        const filters = {
          $or: attrs.map((attr) => ({
            [attr]: { $contains: `{${previousValue}}` },
          })),
        };

        return strapi
          .documents(uid)
          .findMany({ filters })
          .then((entries) => {
            /**
             * @TODO - This should not be necessary in v5. Entries will always be an array.
             */
            // Return singleType results.
            // if (has(entries, 'id')) {
            //   return {
            //     uid,
            //     attrs,
            //     entries: [entries],
            //   };
            // }

            // Return collectionType results.
            if (entries && entries.length) {
              return {
                uid,
                attrs,
                entries: entries.filter(Boolean),
              };
            }

            return null;
          });
      })
    );

    return entries.filter(Boolean);
  },

  async updateEntriesWithSnippet(
    entriesWithSnippet: any[],
    previousValue: string,
    nextValue: string
  ): Promise<void> {
    const promisedUpdates = entriesWithSnippet
      .map(({ uid, attrs, entries }) => {
        return entries.map((entry) => {
          const data = attrs.reduce((acc, attr) => {
            const value =
              typeof entry[attr] !== 'string'
                ? entry[attr]
                : entry[attr].replace(`{${previousValue}}`, `{${nextValue}}`);

            return { ...acc, [attr]: value };
          }, {});

          return strapi.documents(uid).update({
            /**
             * @TODO - What is the appropriate way to update here?
             * @TODO - Need to understand publish/draft/delete cycle here.
             */
            documentId: entry.documentId,
            data,
          });
        });
      })
      .flat();

    const finished = await Promise.all(promisedUpdates);
    console.log('FINISHED', finished);
  },
});

export default snippetsService;
