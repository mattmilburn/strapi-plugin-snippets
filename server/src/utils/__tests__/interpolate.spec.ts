import interpolate from '../interpolate';

describe('interpolate', () => {
  it('should populate snippet codes into a string', () => {
    const codes = {
      FOO: 'quick brown fox',
      BAR: 'lazy dog',
    };
    const input = 'The {FOO} jumps over the {BAR}.';
    const output = `The ${codes.FOO} jumps over the ${codes.BAR}.`;
    const result = interpolate(input, codes);

    expect(result).toEqual(output);
  });

  it('should replace unmatched codes with an empty string', () => {
    const codes = {
      FOO: 'quick brown fox',
    };
    const input = 'The {FOO} jumps over the {BAR}.';
    const output = `The ${codes.FOO} jumps over the .`;
    const result = interpolate(input, codes);

    expect(result).toEqual(output);
  });

  it('should ignore unmatched codes', () => {
    const codes = {
      FOO: 'quick brown fox',
    };
    const input = 'The {FOO} jumps over the {BAR}.';
    const output = `The ${codes.FOO} jumps over the {BAR}.`;
    const result = interpolate(input, codes, true);

    expect(result).toEqual(output);
  });
});
