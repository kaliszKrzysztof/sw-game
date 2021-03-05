import React from 'react';
import { render } from '@testing-library/react';
import GameCard from './GameCard';

const title = 'test';
const attributes = [
  {
    name: 'attr1',
    value: 'attr1',
  },
  {
    name: 'attr2',
    value: 'attr2',
  },
  {
    name: 'attr3',
    value: 'attr3',
  },
  {
    name: 'attr4',
    value: 'attr4',
  },
];

describe('<GameCard />', () => {
  it('should render', () => {
    render(<GameCard title={title} attributes={attributes} expanded={false} />);
  });

  it('should match snapshot', () => {
    const { container } = render(
      <GameCard title={title} attributes={attributes} expanded={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders all passed attributes if expanded', async () => {
    const { queryByTestId, getAllByTestId, rerender } = render(
      <GameCard title={title} attributes={attributes} expanded={false} />,
    );
    expect(queryByTestId('attributes')).not.toBeInTheDocument();

    rerender(<GameCard title={title} attributes={attributes} expanded />);
    const renderedAttributes = getAllByTestId('attribute').map(
      (element) => element.textContent,
    );
    const allAttributes = attributes.map(
      ({ name, value }) => `${name}: ${value}`,
    );
    expect(renderedAttributes).toEqual(allAttributes);
  });

  it('renders status related styles', async () => {
    const { getByTestId, rerender } = render(
      <GameCard title={title} attributes={attributes} expanded={false} />,
    );
    expect(getByTestId('game-card')).not.toHaveAttribute('style');
    rerender(
      <GameCard
        title={title}
        attributes={attributes}
        expanded={false}
        status="win"
      />,
    );
    expect(getByTestId('game-card')).toHaveAttribute(
      'style',
      'border-color: #149414; color: rgb(20, 148, 20);',
    );
    rerender(
      <GameCard
        title={title}
        attributes={attributes}
        expanded={false}
        status="lose"
      />,
    );
    expect(getByTestId('game-card')).toHaveAttribute(
      'style',
      'border-color: #f44336; color: rgb(244, 67, 54);',
    );
    rerender(
      <GameCard
        title={title}
        attributes={attributes}
        expanded={false}
        status="draw"
      />,
    );
    expect(getByTestId('game-card')).toHaveAttribute(
      'style',
      'border-color: #fccf14; color: rgb(252, 207, 20);',
    );
  });
});
