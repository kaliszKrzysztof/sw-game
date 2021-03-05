import { isProduction, randomValuesFromArray } from './app';

describe('app helper', () => {
  describe('isProduction function', () => {
    it('should return false', () => {
      expect(isProduction()).toBeFalsy();
    });
    it('should return true', () => {
      const OLD_ENV = process.env;
      process.env = { ...OLD_ENV, NODE_ENV: 'production' };
      expect(isProduction()).toBeTruthy();
      process.env = OLD_ENV;
    });
  });

  describe('randomValuesFromArray function', () => {
    it('should return two unique values', () => {
      const randomValues = randomValuesFromArray([1, 2, 3], 2);
      expect(randomValues[0]).not.toEqual(randomValues[1]);
    });
    it('should return original array if required number is greater or equal than array length', () => {
      const originalArray = [1, 2, 3];
      const randomValues = randomValuesFromArray(originalArray, 4);
      expect(randomValues.length).toEqual(originalArray.length);
    });
  });
});
