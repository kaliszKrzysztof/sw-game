import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { GameItemData } from 'types/game';
import Game, { getCardStatus } from './Game';

const gameItem1: GameItemData = {
  title: 'item1',
  attributes: [],
  power: 100,
};

const gameItem2: GameItemData = {
  title: 'item2',
  attributes: [],
  power: 200,
};

const gameItem3: GameItemData = {
  title: 'item3',
  attributes: [],
  power: 100,
};

describe('<Game />', () => {
  it('should render', () => {
    render(<Game onPlayClick={() => null} />);
  });

  it('should match snapshot', () => {
    const { container } = render(<Game onPlayClick={() => null} />);
    expect(container).toMatchSnapshot();
  });

  it('should have correct initial state', () => {
    const { getByTestId, queryAllByTestId } = render(
      <Game onPlayClick={() => null} />,
    );
    const playButton = getByTestId('play');
    const resetButton = getByTestId('reset');
    const gameCards = queryAllByTestId('game-card');
    expect(playButton).not.toBeDisabled();
    expect(resetButton).toBeDisabled();
    expect(gameCards).toHaveLength(0);
  });

  it('should be able to play the game', async () => {
    jest.useFakeTimers();
    const onPlayClick = jest.fn();
    onPlayClick.mockReturnValueOnce([gameItem1, gameItem2]);
    const {
      getByTestId,
      getAllByTestId,
      queryAllByTestId,
      findAllByTestId,
    } = render(<Game onPlayClick={onPlayClick} />);
    const playButton = getByTestId('play');
    const gameCards = queryAllByTestId('game-card');
    expect(gameCards).toHaveLength(0);
    fireEvent.click(playButton);
    expect(getByTestId('loader')).toBeInTheDocument();
    expect(await findAllByTestId('game-card')).toHaveLength(2);
    await waitForElementToBeRemoved(() => getByTestId('loader'));

    // check for second element winner
    expect(getAllByTestId('game-card')[0]).toHaveAttribute(
      'style',
      'border-color: #f44336; color: rgb(244, 67, 54);',
    );
    expect(getAllByTestId('game-card')[1]).toHaveAttribute(
      'style',
      'border-color: #149414; color: rgb(20, 148, 20);',
    );
    expect(getByTestId('score1').textContent).toEqual('0');
    expect(getByTestId('score2').textContent).toEqual('1');

    // check for first element winner
    onPlayClick.mockReturnValueOnce([gameItem2, gameItem1]);
    fireEvent.click(playButton);
    expect(getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByTestId('loader'));

    expect(getAllByTestId('game-card')[0]).toHaveAttribute(
      'style',
      'border-color: #149414; color: rgb(20, 148, 20);',
    );
    expect(getAllByTestId('game-card')[1]).toHaveAttribute(
      'style',
      'border-color: #f44336; color: rgb(244, 67, 54);',
    );
    expect(getByTestId('score1').textContent).toEqual('1');
    expect(getByTestId('score2').textContent).toEqual('1');

    // check for draw
    onPlayClick.mockReturnValueOnce([gameItem3, gameItem1]);
    fireEvent.click(playButton);
    expect(getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByTestId('loader'));

    expect(getAllByTestId('game-card')[0]).toHaveAttribute(
      'style',
      'border-color: #fccf14; color: rgb(252, 207, 20);',
    );
    expect(getAllByTestId('game-card')[1]).toHaveAttribute(
      'style',
      'border-color: #fccf14; color: rgb(252, 207, 20);',
    );
    expect(getByTestId('score1').textContent).toEqual('1');
    expect(getByTestId('score2').textContent).toEqual('1');

    jest.useRealTimers();
  });

  it('can reset score', async () => {
    jest.useFakeTimers();
    const onPlayClick = jest.fn();
    onPlayClick.mockReturnValueOnce([gameItem1, gameItem2]);
    const { getByTestId } = render(<Game onPlayClick={onPlayClick} />);
    const playButton = getByTestId('play');
    const resetButton = getByTestId('reset');
    fireEvent.click(playButton);
    expect(getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByTestId('loader'));

    expect(getByTestId('score1').textContent).toEqual('0');
    expect(getByTestId('score2').textContent).toEqual('1');

    fireEvent.click(resetButton);

    expect(getByTestId('score1').textContent).toEqual('0');
    expect(getByTestId('score2').textContent).toEqual('0');

    jest.useRealTimers();
  });

  it('should return correct status', () => {
    expect(getCardStatus('item1', 'item1', false)).toEqual('win');
    expect(getCardStatus('item1', '', true)).toEqual('draw');
    expect(getCardStatus('item1', 'item2', false)).toEqual('lose');
  });
});
