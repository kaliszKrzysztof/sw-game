import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer />', () => {
  it('should render', () => {
    render(<Footer />);
  });
  it('matches the snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
