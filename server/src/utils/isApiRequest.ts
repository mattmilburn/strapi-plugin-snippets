const isApiRequest = (ctx): boolean => ctx?.state?.route?.info?.type === 'content-api';

export default isApiRequest;
