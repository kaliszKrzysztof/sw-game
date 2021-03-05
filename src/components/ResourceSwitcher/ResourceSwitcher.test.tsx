import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ResourceSwitcher from './ResourceSwitcher';

const items = [
  {
    name: 'Test1',
    id: 'test1',
    disabled: false,
  },
  {
    name: 'Test2',
    id: 'test2',
    disabled: false,
  },
];

describe('<ResourceSwitcher />', () => {
  it('should render', () => {
    render(
      <ResourceSwitcher
        items={items}
        activeItemId={items[0].id}
        onClick={() => null}
      />,
    );
  });
  it('should match snapshot', () => {
    const { container } = render(
      <ResourceSwitcher
        items={items}
        activeItemId={items[0].id}
        onClick={() => null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('can set initial tab', () => {
    const { getByTestId } = render(
      <ResourceSwitcher
        items={items}
        activeItemId={items[1].id}
        onClick={() => null}
      />,
    );
    expect(getByTestId(items[1].id)).toHaveAttribute('aria-selected', 'true');
  });

  it('can change active tab', () => {
    const defaultTab = items[0];
    const newTab = items[1];
    const { getByTestId, rerender } = render(
      <ResourceSwitcher
        items={items}
        activeItemId={defaultTab.id}
        onClick={() => null}
      />,
    );
    expect(getByTestId(defaultTab.id)).toHaveAttribute('aria-selected', 'true');
    rerender(
      <ResourceSwitcher
        items={items}
        activeItemId={newTab.id}
        onClick={() => null}
      />,
    );
    expect(getByTestId(newTab.id)).toHaveAttribute('aria-selected', 'true');
  });

  it('cannot click disabled items', () => {
    const mockOnClick = jest.fn();
    const itemsWithDisabledElement = [
      items[0],
      { ...items[1], disabled: true },
    ];
    const { getByTestId } = render(
      <ResourceSwitcher
        items={itemsWithDisabledElement}
        activeItemId={items[0].id}
        onClick={mockOnClick}
      />,
    );
    fireEvent.click(getByTestId(itemsWithDisabledElement[1].id));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('can click enabled items', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <ResourceSwitcher
        items={items}
        activeItemId={items[1].id}
        onClick={mockOnClick}
      />,
    );
    fireEvent.click(getByTestId(items[0].id));
    expect(mockOnClick).toHaveBeenCalledWith(items[0].id);
  });
});
