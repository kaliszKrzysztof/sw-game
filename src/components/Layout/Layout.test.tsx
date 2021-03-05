import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('<Layout />', () => {
  it('should render', () => {
    render(
      <Layout>
        <span>Layout</span>
      </Layout>,
    );
  });
  it('should match snapshot', () => {
    const { container } = render(
      <Layout>
        <span>Layout</span>
      </Layout>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render provided children', () => {
    const { getByTestId } = render(
      <Layout>
        <span data-testid="children">Layout</span>
      </Layout>,
    );
    expect(getByTestId('children')).toBeInTheDocument();
  });
});
