import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NavBar link', () => {
  render(<App />);
  const linkElement = screen.getByText(/All Tradenotes/i);
  expect(linkElement).toBeInTheDocument();
});
