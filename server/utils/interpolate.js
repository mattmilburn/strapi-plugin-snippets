'use strict';

const interpolate = (originalStr, data = {}, ignoreUnmatched = false) => {
  let str = originalStr;

  Object.entries(data).forEach(([key, value]) => {
    // eslint-disable-next-line prefer-regex-literals
    str = str.replace(new RegExp(`{${key}}`, 'g'), value);
  });

  // If `ignoreUnmatched` is false, replace any unmatched values with an empty
  // string, otherwise do nothing and leave them unparsed.
  if (!ignoreUnmatched) {
    // eslint-disable-next-line prefer-regex-literals
    str = str.replace(new RegExp(`{[A-Za-z0-9-_.~]+}`, 'g'), '').trim();
  }

  return str;
};

module.exports = interpolate;
