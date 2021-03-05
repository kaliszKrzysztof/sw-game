import { Person } from 'types/people';
import { GameItemData } from 'types/game';

export const calculatePersonPower = (person: Person): number => {
  return parseFloat(person.mass.replace(/,/g, '')) || 0;
};

export const personToGameData = (person: Person): GameItemData => ({
  title: person.name,
  attributes: [
    {
      name: 'Gender',
      value: person.gender,
    },
    {
      name: 'Mass',
      value: person.mass,
    },
    {
      name: 'Height',
      value: person.height,
    },
    {
      name: 'Birth year',
      value: person.birth_year,
    },
    {
      name: 'Eye color',
      value: person.eye_color,
    },
    {
      name: 'Hair color',
      value: person.hair_color,
    },
    {
      name: 'Skin color',
      value: person.skin_color,
    },
  ],
  power: calculatePersonPower(person),
});
