import { type Core, type UID } from '@strapi/strapi';

import { UID_SNIPPET } from '../constants';
import { getParsableAttrs } from '../utils';

export type SnippetsService = ReturnType<typeof snippetsService>;

export interface EntriesWithSnippet {
  uid: UID.ContentType;
  attrs: string[];
  entries: any[];
}

const snippetsService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get(): Promise<Record<string, string>> {
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
        const attrs = getParsableAttrs(uid);

        if (!attrs.length) {
          return null;
        }

        // Build filters object to help find entries that contain the previous snippet code.
        const filters = {
          $or: attrs.map((attr) => ({
            [attr]: { $contains: `{${previousValue}}` },
          })),
        };

        // Find document entries and components that contain the previous snippet code.
        return strapi.db
          .query(uid)
          .findMany({ filters })
          .then((entries) => {
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

    return entries.filter(Boolean) as EntriesWithSnippet[];
  },

  async updateEntriesWithSnippet(
    entriesWithSnippet: EntriesWithSnippet[],
    previousValue: string,
    nextValue: string
  ): Promise<void> {
    const promisedUpdates = entriesWithSnippet
      .map(({ uid, attrs, entries }) => {
        return entries.map((entry) => {
          const data = attrs.reduce((acc, attr) => {
            let value = entry[attr];

            // Update string fields.
            if (typeof entry[attr] === 'string') {
              value = entry[attr].replace(`{${previousValue}}`, `{${nextValue}}`);
            }

            // Update block fields.
            if (Array.isArray(entry[attr])) {
              value = JSON.parse(
                JSON.stringify(entry[attr]).replace(`{${previousValue}}`, `{${nextValue}}`)
              );
            }

            return { ...acc, [attr]: value };
          }, {});

          return strapi.db.query(uid).update({
            data,
            where: {
              id: entry.id,
            },
          });
        });
      })
      .flat();

    await Promise.all(promisedUpdates);
  },
});

export default snippetsService;
