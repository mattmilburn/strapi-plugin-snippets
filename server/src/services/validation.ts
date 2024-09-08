import { errors } from '@strapi/utils';

import { REGEX_ALPHANUMERIC_VAR } from '../constants';

type ValidationService = ReturnType<typeof validationService>

const validationService = () => ({
  validateFormat(value: string): void {
    const validFormat = REGEX_ALPHANUMERIC_VAR.test(value);

    if (!validFormat) {
      throw new errors.ValidationError(
        'The code value may only contain letters, numbers, and underscores and must start with a letter.'
      );
    }
  },
});

export { type ValidationService };
export default validationService;
