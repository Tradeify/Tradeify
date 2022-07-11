import { render, screen } from '@testing-library/react';
import Login from '../components/login';

test('renders log in button', () => {
   render(<Login />);
   const linkElement = screen.getByText(/Log In/i);
   expect(linkElement).toBeInTheDocument();
});