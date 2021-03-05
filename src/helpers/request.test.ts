import {
  getApiUrl,
  getRequestUrl,
  createApiErrorResponse,
  performRequest,
} from './request';

const API_URL = 'https://swapi.dev/api/';

describe('request helper', () => {
  describe('getApiUrl funciton', () => {
    it('should return correct api url', () => {
      expect(getApiUrl()).toEqual(API_URL);
    });
  });

  describe('getRequestUrl function', () => {
    it('should return url with path without params', () => {
      expect(getRequestUrl('test')).toEqual(`${API_URL}test/`);
    });
    it('should add url params', () => {
      expect(
        getRequestUrl('test', { param1: 1, param2: 'test', param3: 'abcd' }),
      ).toEqual(`${API_URL}test/?param1=1&param2=test&param3=abcd`);
    });
  });

  describe('createApiErrorResponse function', () => {
    it('should return api error object', () => {
      expect(createApiErrorResponse(404, 'Test')).toEqual({
        status: 404,
        message: 'Test',
      });
    });
  });

  describe('performRequest function', () => {
    it('should return success response in correct structure', async () => {
      fetchMock.mockResponse(() => {
        return Promise.resolve({
          body: JSON.stringify({ test: 1 }),
          status: 200,
        });
      });
      const response = await performRequest('/test');
      expect(response).toEqual({ data: { test: 1 }, error: null });
    });

    it('should return error response in correct structure', async () => {
      fetchMock.mockResponse(() => {
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not found',
        });
      });
      const response = await performRequest('/test');
      expect(response).toEqual({
        data: null,
        error: { status: 404, message: 'Not found' },
      });
    });
  });
});
