import { Starship } from 'types/starships';
import { GameItemData } from 'types/game';

export const calculateStarshipPower = (starship: Starship): number => {
  const splittedCrewValue = starship.crew.split('-');
  const maxCrew = splittedCrewValue[splittedCrewValue.length - 1];
  return parseFloat(maxCrew.replace(/,/g, '')) || 0;
};

export const starshipToGameData = (starship: Starship): GameItemData => ({
  title: starship.name,
  attributes: [
    {
      name: 'Model',
      value: starship.model,
    },
    {
      name: 'Starship class',
      value: starship.starship_class,
    },
    {
      name: 'Manufacturer',
      value: starship.manufacturer,
    },
    {
      name: 'Cost in credits',
      value: starship.cost_in_credits,
    },
    {
      name: 'Length',
      value: starship.length,
    },
    {
      name: 'Max atmosphering speed',
      value: starship.max_atmosphering_speed,
    },
    {
      name: 'Crew',
      value: starship.crew,
    },
    {
      name: 'Passengers',
      value: starship.passengers,
    },
    {
      name: 'Cargo capacity',
      value: starship.cargo_capacity,
    },
    {
      name: 'Consumables',
      value: starship.consumables,
    },
    {
      name: 'Hyperdrive rating',
      value: starship.hyperdrive_rating,
    },
    {
      name: 'MGLT',
      value: starship.MGLT,
    },
  ],
  power: calculateStarshipPower(starship),
});
