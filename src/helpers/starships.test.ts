import starships from 'data/starships';
import { calculateStarshipPower, starshipToGameData } from './starships';

const ship1 = starships[0];
const ship2 = starships[1];
const ship3 = starships[2];
const ship4 = starships[3];

describe('starships helper', () => {
  describe('calculateStarshipPower function', () => {
    it('should hanlde range numbers and pick higher numeber', () => {
      expect(calculateStarshipPower(ship1)).toEqual(165);
    });
    it('should hanlde coma separated numbers', () => {
      expect(calculateStarshipPower(ship2)).toEqual(47060);
    });
    it('should hanlde numbers', () => {
      expect(calculateStarshipPower(ship3)).toEqual(5);
    });
    it('should hanlde not a number', () => {
      ship4.crew = 'n/a';
      expect(calculateStarshipPower(ship4)).toEqual(0);
    });
  });

  describe('starshipToGameData function', () => {
    expect(starshipToGameData(ship3)).toEqual({
      attributes: [
        {
          name: 'Model',
          value: 'Sentinel-class landing craft',
        },
        {
          name: 'Starship class',
          value: 'landing craft',
        },
        {
          name: 'Manufacturer',
          value: 'Sienar Fleet Systems, Cyngus Spaceworks',
        },
        {
          name: 'Cost in credits',
          value: '240000',
        },
        {
          name: 'Length',
          value: '38',
        },
        {
          name: 'Max atmosphering speed',
          value: '1000',
        },
        {
          name: 'Crew',
          value: '5',
        },
        {
          name: 'Passengers',
          value: '75',
        },
        {
          name: 'Cargo capacity',
          value: '180000',
        },
        {
          name: 'Consumables',
          value: '1 month',
        },
        {
          name: 'Hyperdrive rating',
          value: '1.0',
        },
        {
          name: 'MGLT',
          value: '70',
        },
      ],
      power: 5,
      title: 'Sentinel-class landing craft',
    });
  });
});
