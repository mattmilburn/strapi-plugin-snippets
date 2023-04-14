import { REGEX_SNIPPET_CODE } from '../constants';

const sanitizeCode = value => {
  return value.toUpperCase();
};

export default sanitizeCode;
