import starships from 'data/starships';
import { getStarships, getAllStarships } from './starships';

const starshipsPageOneRespone = {
  count: 4,
  next: 'page2',
  previous: null,
  results: starships.slice(0, 2),
};

const starshipsPageTwoRespone = {
  count: 4,
  next: null,
  previous: 'page1',
  results: starships.slice(2, 4),
};

describe('starships api', () => {
  describe('getstarships function', () => {
    it('should return starships response as second item in array', async () => {
      fetchMock.mockResponse(() => {
        return Promise.resolve({
          body: JSON.stringify(starshipsPageOneRespone),
          status: 200,
        });
      });
      const [error, data] = await getStarships({ page: 1 });
      expect(error).toBeNull();
      expect(data).toEqual(starshipsPageOneRespone);
    });
    it('should return error response as first item in array', async () => {
      fetchMock.mockResponse(() => {
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not found',
        });
      });
      const [error, data] = await getStarships({ page: 1 });
      expect(data).toBeNull();
      expect(error).toEqual({ status: 404, message: 'Not found' });
    });
  });
  describe('getAllstarships function', () => {
    it('should return all starships', async () => {
      fetchMock.mockResponse((request) => {
        if (request.url === 'https://swapi.dev/api/starships/?page=1') {
          return Promise.resolve({
            body: JSON.stringify(starshipsPageOneRespone),
            status: 200,
          });
        }
        return Promise.resolve({
          body: JSON.stringify(starshipsPageTwoRespone),
          status: 200,
        });
      });
      const [error, allstarships] = await getAllStarships();
      expect(error).toBeNull();
      expect(allstarships).toHaveLength(4);
      expect(allstarships).toEqual(starships.slice(0, 4));
    });
    it('should return error if any starships response returns error', async () => {
      fetchMock.mockResponse((request) => {
        if (request.url === 'https://swapi.dev/api/starships/?page=1') {
          return Promise.resolve({
            body: JSON.stringify(starshipsPageOneRespone),
            status: 200,
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not found',
        });
      });
      const [error, allstarships] = await getAllStarships();
      expect(allstarships).toEqual([]);
      expect(error).toEqual({ status: 404, message: 'Not found' });
    });
  });
});
