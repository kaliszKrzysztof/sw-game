import people from 'data/people';
import { getPeople, getAllPeople } from './people';

const peoplePageOneRespone = {
  count: 4,
  next: 'page2',
  previous: null,
  results: people.slice(0, 2),
};

const peoplePageTwoRespone = {
  count: 4,
  next: null,
  previous: 'page1',
  results: people.slice(2, 4),
};

describe('people api', () => {
  describe('getPeople function', () => {
    it('should return people response as second item in array', async () => {
      fetchMock.mockResponse(() => {
        return Promise.resolve({
          body: JSON.stringify(peoplePageOneRespone),
          status: 200,
        });
      });
      const [error, data] = await getPeople({ page: 1 });
      expect(error).toBeNull();
      expect(data).toEqual(peoplePageOneRespone);
    });
    it('should return error response as first item in array', async () => {
      fetchMock.mockResponse(() => {
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not found',
        });
      });
      const [error, data] = await getPeople({ page: 1 });
      expect(data).toBeNull();
      expect(error).toEqual({ status: 404, message: 'Not found' });
    });
  });
  describe('getAllPeople function', () => {
    it('should return all people', async () => {
      fetchMock.mockResponse((request) => {
        if (request.url === 'https://swapi.dev/api/people/?page=1') {
          return Promise.resolve({
            body: JSON.stringify(peoplePageOneRespone),
            status: 200,
          });
        }
        return Promise.resolve({
          body: JSON.stringify(peoplePageTwoRespone),
          status: 200,
        });
      });
      const [error, allPeople] = await getAllPeople();
      expect(error).toBeNull();
      expect(allPeople).toHaveLength(4);
      expect(allPeople).toEqual(people.slice(0, 4));
    });
    it('should return error if any people response returns error', async () => {
      fetchMock.mockResponse((request) => {
        if (request.url === 'https://swapi.dev/api/people/?page=1') {
          return Promise.resolve({
            body: JSON.stringify(peoplePageOneRespone),
            status: 200,
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not found',
        });
      });
      const [error, allPeople] = await getAllPeople();
      expect(allPeople).toEqual([]);
      expect(error).toEqual({ status: 404, message: 'Not found' });
    });
  });
});
