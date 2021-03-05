import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('<Loader />', () => {
  it('should render', () => {
    render(<Loader />);
  });
  it('matches the snapshot without props', () => {
    const { container, getByTestId } = render(<Loader />);
    expect(getByTestId('loader')).toHaveAttribute(
      'style',
      'width: 40px; height: 40px;',
    );
    expect(container).toMatchSnapshot();
  });

  it('passes props to material-ui loader', () => {
    const { container, getByTestId } = render(<Loader size={100} />);
    expect(getByTestId('loader')).toHaveAttribute(
      'style',
      'width: 100px; height: 100px;',
    );
    expect(container).toMatchSnapshot();
  });
});
