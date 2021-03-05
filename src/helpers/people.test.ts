import people from 'data/people';
import { calculatePersonPower, personToGameData } from './people';

const person1 = people[0];
const person2 = people[20];
const person3 = people[30];

describe('people helper', () => {
  describe('calculatePersonPower function', () => {
    it('should hanlde coma separated numbers', () => {
      expect(calculatePersonPower(person1)).toEqual(77);
    });
    it('should hanlde numbers', () => {
      expect(calculatePersonPower(person2)).toEqual(78.2);
    });
    it('should hanlde not a number', () => {
      person3.mass = 'n/a';
      expect(calculatePersonPower(person3)).toEqual(0);
    });
  });

  describe('personToGameData function', () => {
    expect(personToGameData(person1)).toEqual({
      attributes: [
        {
          name: 'Gender',
          value: 'male',
        },
        {
          name: 'Mass',
          value: '77',
        },
        {
          name: 'Height',
          value: '172',
        },
        {
          name: 'Birth year',
          value: '19BBY',
        },
        {
          name: 'Eye color',
          value: 'blue',
        },
        {
          name: 'Hair color',
          value: 'blond',
        },
        {
          name: 'Skin color',
          value: 'fair',
        },
      ],
      power: 77,
      title: 'Luke Skywalker',
    });
  });
});
