import { fight } from './game';

describe('game helper', () => {
  describe('fight function', () => {
    it('should be draw', () => {
      expect(
        fight([
          { title: 'Test1', power: 100, attributes: [] },
          { title: 'Test2', power: 100, attributes: [] },
        ]),
      ).toEqual({
        winner: '',
        scores: [0, 0],
        draw: true,
      });
    });
    it('should first player win', () => {
      expect(
        fight([
          { title: 'Test1', power: 101, attributes: [] },
          { title: 'Test2', power: 100, attributes: [] },
        ]),
      ).toEqual({
        winner: 'Test1',
        scores: [1, 0],
      });
    });
    it('should second player win', () => {
      expect(
        fight([
          { title: 'Test1', power: 10, attributes: [] },
          { title: 'Test2', power: 100, attributes: [] },
        ]),
      ).toEqual({
        winner: 'Test2',
        scores: [0, 1],
      });
    });
  });
});
