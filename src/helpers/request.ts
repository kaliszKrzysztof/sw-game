import { ApiErrorResponse } from 'types/api';

export const createApiErrorResponse = (
  status: number,
  message: string,
): ApiErrorResponse => ({
  status,
  message,
});

export const getApiUrl = (): string => 'https://swapi.dev/api/';

export const getRequestUrl = (
  path: string,
  params?: { [key: string]: string | number },
): string => {
  const baseUrl = `${getApiUrl()}${path}/`;
  if (params) {
    const entries = Object.entries(params);
    const paramsString = entries.reduce((acc, [key, value], index) => {
      return `${acc}${key}=${value}${index < entries.length - 1 ? '&' : ''}`;
    }, '');
    return `${baseUrl}?${paramsString}`;
  }
  return baseUrl;
};

export const performRequest = <T>(
  url: string,
): Promise<{ error: ApiErrorResponse; data: T }> => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(
          createApiErrorResponse(response.status, response.statusText),
        );
      }
      return response.json() as Promise<T>;
    })
    .then((data) => {
      return { error: null, data };
    })
    .catch((error) => {
      return {
        error: { status: error.status, message: error.message },
        data: null,
      };
    });
};
