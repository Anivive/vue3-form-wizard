import { iApiOptions } from '@/interfaces/form.d.ts';

export default async function useApi(apiConfig: iApiOptions) {
  const {
    url, method = 'GET', headers = {}, params = {}, body
  } = apiConfig;
  const queryString = Object.keys(params).map((key: string) => `${key}=${params[key]}`).join('&');
  const response = await fetch(queryString.length ? `${url}?${queryString}` : url, {
    method,
    headers: {
      ...headers
    },
    body
  });

  return response.json();
}
