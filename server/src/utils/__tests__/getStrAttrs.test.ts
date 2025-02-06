import getStrAttrs from '../getStrAttrs';

describe('getStrAttrs', () => {
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
          email: {
            type: 'email',
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
    } as any;
  });

  it('should return string type attributes defined for a model', () => {
    const input = 'api::example.example';
    const output = ['title', 'summary', 'content', 'email', 'custom'];
    const result = getStrAttrs(input);

    expect(result).toEqual(output);
  });
});
