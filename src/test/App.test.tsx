import React from 'react';
import { render } from '@testing-library/react';
import Simple from '../examples/Simple';

test('renders learn react link', () => {
  const { getByText } = render(<Simple />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
