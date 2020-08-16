const HEADERS = {
  'x-rapidapi-host': process.env.REACT_APP_API_HOST,
  'x-rapidapi-key': process.env.REACT_APP_API_KEY,
  useQueryString: true,
};

export const HEADERS_GET = {
  ...HEADERS,
  'content-type': 'application/octet-stream',
};

export const HEADERS_POST = {
  ...HEADERS,
  'content-type': 'application/x-www-form-urlencoded',
};

export const HOST = `https://${process.env.REACT_APP_API_HOST}`;