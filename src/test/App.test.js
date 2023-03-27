import App from '@src/App';
import { renderWithProviders, screen } from './utils';

test('1.customer name is 곽지우', () => {
  renderWithProviders(<App />);
  const text = screen.getByText('곽지우');
  expect(text).toHaveTextContent('곽지우');
});
