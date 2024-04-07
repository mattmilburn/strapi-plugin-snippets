'use strict';

const getStrAttrs = require('../get-str-attrs');

describe('getStrAttrs', () => {
  // eslint-disable-next-line no-unused-vars
  let strapi;

  beforeAll(async () => {
    global.strapi = {
      getModel: jest.fn().mockReturnValue({
        attributes: {
          title: {
            type: 'string',
          },
          summary: {
            type: 'text',
          },
          content: {
            type: 'richtext',
          },
          image: {
            type: 'media',
            multiple: false,
            allowedTypes: ['images'],
          },
          publish_date: {
            type: 'date',
          },
          custom: {
            type: 'customField',
            customField: 'plugin::example.example',
          },
        },
      }),
    };
  });

  it('should return string type attributes defined for a model', () => {
    const input = 'api::example.example';
    const output = ['title', 'summary', 'content', 'custom'];
    const result = getStrAttrs(input);

    expect(result).toEqual(output);
  });
});
