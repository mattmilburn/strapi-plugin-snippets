import sanitizeCode from '../sanitizeCode';

describe('sanitizeCode', () => {
  it('should remove any non-alphanumeric characters', () => {
    const input = 'example_123(&)?';
    const output = 'example_123';
    const result = sanitizeCode(input);

    expect(result).toEqual(output);
  });

  it('should enforce uppercasing', () => {
    const input = 'example123';
    const output = 'EXAMPLE123';
    const result = sanitizeCode(input, { uppercase: true });

    expect(result).toEqual(output);
  });
});
