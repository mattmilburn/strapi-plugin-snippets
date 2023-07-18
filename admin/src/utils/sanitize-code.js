import { REGEX_NON_ALPHANUMERIC } from '../constants';

const sanitizeCode = (code, config = {}) => {
  let value = code;

  // Maybe apply uppercase format.
  if (config.uppercase) {
    value = value.toUpperCase();
  }

  // Sanitize value to remove unwanted characters.
  value = value.replace(REGEX_NON_ALPHANUMERIC, '');

  return value;
};

export default sanitizeCode;
