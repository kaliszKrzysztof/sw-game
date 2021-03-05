import React from 'react';
import { render } from '@testing-library/react';
import ErrorInfo from './ErrorInfo';

describe('<ErrorInfo />', () => {
  it('should render', () => {
    render(<ErrorInfo title="Test" message="Test" />);
  });
  it('matches the snapshot', () => {
    const { container } = render(<ErrorInfo title="Test" message="Test" />);
    expect(container).toMatchSnapshot();
  });
  it('should render correct items', () => {
    const { getByTestId } = render(
      <ErrorInfo title="Title" message="Message" />,
    );
    expect(getByTestId('title').textContent).toEqual('Title');
    expect(getByTestId('message').textContent).toEqual('Message');
    expect(getByTestId('image')).toBeInTheDocument();
  });
});
