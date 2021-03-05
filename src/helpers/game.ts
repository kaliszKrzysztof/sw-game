import { GameItemData } from 'types/game';

type FightResult = {
  scores: [number, number];
  winner: string;
  draw?: boolean;
};

export const fight = (opponents: GameItemData[]): FightResult => {
  const [opponent1, opponent2] = opponents;
  if (opponent1.power > opponent2.power) {
    return {
      winner: opponent1.title,
      scores: [1, 0],
    };
  }
  if (opponent1.power < opponent2.power) {
    return {
      winner: opponent2.title,
      scores: [0, 1],
    };
  }
  return {
    winner: '',
    scores: [0, 0],
    draw: true,
  };
};
